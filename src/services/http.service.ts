// Dependencies
import axios, { AxiosRequestConfig, Method } from "axios";

// Storage
import { Storage } from "./storage.service";

// Create http with axios
const http = axios.create({ baseURL: `${process.env.API_SERVER || "http://localhost:3100/api/v1"}` });

// Create request
const request = (method: Method, url: string, options: AxiosRequestConfig): Promise<any> => {
    // @ts-ignore
    const accessToken = Storage.getItem(process.env.ACCESS_TOKEN_KEY || "access_token");

    // Return http request
    return http
        .request({
            ...options,
            method,
            url,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            const response = err.response;
            const data = response?.data;

            // eslint-disable-next-line no-throw-literal
            throw {
                ...data,
                message: data?.message || "Network Error!"
            };
        });
};

// Export http
export const Http = {
    get(url: string, params: AxiosRequestConfig["params"] = {}, headers: AxiosRequestConfig["headers"] = {}) {
        return request("GET", url, { params, headers });
    },
    post(url: string, body: AxiosRequestConfig["data"] = {}, headers: AxiosRequestConfig["headers"] = {}) {
        return request("POST", url, { data: body, headers });
    },
    put(url: string, body: AxiosRequestConfig["data"] = {}, headers: AxiosRequestConfig["headers"] = {}) {
        return request("PUT", url, { data: body, headers });
    },
    patch(url: string, body: AxiosRequestConfig["data"] = {}, headers: AxiosRequestConfig["headers"] = {}) {
        return request("PATCH", url, { data: body, headers });
    },
    delete(url: string, body: AxiosRequestConfig["data"] = {}, headers: AxiosRequestConfig["headers"] = {}) {
        return request("DELETE", url, { data: body, headers });
    }
};
