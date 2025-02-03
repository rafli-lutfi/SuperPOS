import axios from "axios";

export function fetcher<T>(url: string): Promise<T> {
    return axios.get(url).then((res) => res.data);
}

export function fetcherForInfiniteScroll<T>(url: string): Promise<T> {
    return axios.get(url).then((res) => res.data.data);
}

export function poster<T>(url: string, payload: T) {
    return axios.post(url, payload).then((res) => res.data);
}
