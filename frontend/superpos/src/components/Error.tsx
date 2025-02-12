import { Response } from "@/types/Response";
import { AxiosError } from "axios";

export default function Error({ error }: { error: AxiosError<Response<null>> }) {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="text-center">
                <p>Error loading page...</p>
                <p>{error?.message || "Unknown error"}</p>
            </div>
        </div>
    );
}
