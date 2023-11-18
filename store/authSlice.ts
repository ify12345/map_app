import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import authService from "./services/authService";
import { devInstance } from "./devInstance";
import Toast from "react-native-toast-message";

interface AuthState {
    user: object;
    token: string;
}

const initialState: AuthState = {
    user: {},
    token: "",
};

export const loginUser = createAsyncThunk(
    "/auth",
    async (userData: object, thunkAPI) => {
        try {
            return await authService.loginUser(userData);
        } catch (error: any) {
            const message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        increment: (state) => {
            // state.value += 1;
        },
        decrement: (state) => {
            // state.value -= 1;
        },

        incrementByAmount: (state, action: PayloadAction<number>) => {
            // state.value += action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {})
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.user = action.payload;
                    state.token = action.payload.token;
                    Toast.show({
                        type: "success",
                        text1: "You have successfully logged in",
                        text2: "Pick your interests to continue",
                    });
                }
            )
            .addCase(
                loginUser.rejected,
                (state, action: PayloadAction<any>) => {
                    console.log(action.payload);
                    Toast.show({
                        type: "error",
                        text1: `${action.payload.error.detailed_error}`,
                    });
                }
            );
    },
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        console.log(token, "set authentication token method");
        devInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete devInstance.defaults.headers.common.Authorization;
    }
};

export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
