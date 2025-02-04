import axios from "axios";

export function fetcher<T>(url: string): Promise<T> {
    return axios.get(url).then((res) => res.data);
}

export function poster<T, R>(url: string, payload: T): Promise<R> {
    return axios.post(url, payload).then((res) => res.data);
}

export function updater<T, R>(url: string, payload: T): Promise<R> {
    return axios.put(url, payload).then((res) => res.data);
}
