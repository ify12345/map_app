import axios from "axios";
// import { setAuthToken, setUser } from "./auth-slice";

const API_URL = "https://staging.roadersmap.com/api";

export const devInstance = axios.create({
    baseURL: API_URL,
});

devInstance.interceptors.response.use(
    async (config: any) => {
        config.headers = {
            "Content-Type": "application/json",
            ...config.headers,
        };
        return config;
    },
    (error: any) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem("persist:root");
            localStorage.removeItem("token");
            // setUser(null);
            // setAuthToken(null);
        }
        return Promise.reject(error);
    }
);
