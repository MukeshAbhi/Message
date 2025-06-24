/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface ApiRequestParams {
    url: string;
    token?: string;
    data?: any;
    method?: string;
}

export const API = axios.create({
    baseURL: API_URL,
    validateStatus: (status) => status < 500,
});

export const apiRequest = async ({ url, token, data, method }: ApiRequestParams) => {
    console.log("API Call → URL:", API_URL + url);
    console.log("Request Data:", data);
    try {
        const result = await API(url, {
            method : method || "GET",
            data,
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            }
        });

        return result.data;
    } catch (error) {
        console.error("API request error:", error);
        return null;
    }
};

export function formatMessageTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });
}
