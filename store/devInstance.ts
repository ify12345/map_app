import axios from "axios";
import { setAuthToken } from "./authSlice";
const DEV_API_URL = "http://127.0.0.1:8000/api";
const API_URL = "https://staging.roadersmap.com/api";

export const devInstance = axios.create({
    baseURL: DEV_API_URL,
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
            setAuthToken(null);
        }
        return Promise.reject(error);
    }
);
