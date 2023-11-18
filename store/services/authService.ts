import { setAuthToken } from "../authSlice";
import { devInstance } from "../devInstance";

const loginUser = async (userData: object) => {
    const res = await devInstance.post("/auth", userData);
    setAuthToken(res.data.data.token);
    return res.data.data;
};

const registerUser = async (userData: any) => {
    const res = await devInstance.post(`/user/${userData.user_id}`, {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        user_id: userData.user_id,
    });
    return res.data.data;
};

const authService = {
    loginUser,
    registerUser,
};

export default authService;
