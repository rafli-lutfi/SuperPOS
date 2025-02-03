import { Response } from "@/types/Response";
import { fetcher } from "./fetcher";
import useSWRInfinite from "swr/infinite";
import { Pagination } from "@/types/Pagination";
import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, RootState, AppStore } from "./store";

const PAGE_SIZE = 9;

export const usePagination = <T, K extends string>(url: string, params: string) => {
    const getKey = (pageIndex: number, previousPageData: Response<Pagination<T, K>>) => {
        if (previousPageData && previousPageData.data.is_last) return null;

        const otherParams = params.length ? `&${params}` : "";

        return `${url}?page=${pageIndex + 1}&size=${PAGE_SIZE}${otherParams}`;
    };

    const { data, isLoading, setSize, size, error, mutate } = useSWRInfinite<Response<Pagination<T, K>>>(
        getKey,
        fetcher
    );

    const isReachEnd = data && data[data.length - 1].data.is_last;
    const loadingMore = data && typeof data[size - 1] === "undefined";

    return { data, isLoading, setSize, size, isReachEnd, loadingMore, error, mutate };
};

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
