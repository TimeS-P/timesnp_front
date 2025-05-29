// api.ts

import { AxiosRequestConfig } from "axios";
import apiFacade from "../../services/Login/apiFacade";

const api = {

    get: async <T>(url: string, config?: AxiosRequestConfig) => {
        return await apiFacade.get<T>(url, config);
    },

    post: async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
        return await apiFacade.post<T>(url, data, config);
    },

    put: async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
        return await apiFacade.put<T>(url, data, config);
    },
    delete: async <T>(url: string, config?: AxiosRequestConfig) => {
        return await apiFacade.delete<T>(url, config);
    }

}

export default api;