import axios, { AxiosError } from "axios";

export function fetcher<T>(url: string): Promise<T> {
    return axios
        .get(url)
        .then((res) => res.data)
        .catch((err: AxiosError<T>) => {
            if (err.response) {
                return Promise.reject(err.response.data);
            }
            return Promise.reject(err.message);
        });
}

export function poster<T, R>(url: string, payload: T): Promise<R> {
    return axios
        .post(url, payload)
        .then((res) => res.data)
        .catch((err: AxiosError<T>) => {
            if (err.response) {
                return Promise.reject(err.response.data);
            }
            return Promise.reject(err.message);
        });
}

export function updater<T, R>(url: string, payload: T): Promise<R> {
    return axios
        .put(url, payload)
        .then((res) => res.data)
        .catch((err: AxiosError<T>) => {
            if (err.response) {
                return Promise.reject(err.response.data);
            }
            return Promise.reject(err.message);
        });
}

export function deleter<T>(url: string): Promise<T> {
    return axios
        .delete(url)
        .then((res) => res.data)
        .catch((err: AxiosError<T>) => {
            if (err.response) {
                return Promise.reject(err.response.data);
            }
            return Promise.reject(err.message);
        });
}
