import { Response } from "@/types/Response";

export default function Error({ error }: { error: Response<null> | string }) {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="text-center">
                <p>Error loading page...</p>
                <p>{typeof error === "string" ? error : error?.message || "Unknown error"}</p>
            </div>
        </div>
    );
}
