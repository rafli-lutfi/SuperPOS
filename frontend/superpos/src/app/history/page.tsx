import { Suspense } from "react";
import HistoryTable from "./_components/HistoryTable";
import Loading from "@/components/Loading";

export default function HistoryTransactionPage() {
    return (
        <div className="mx-6 flex h-full w-full flex-col">
            <h1 className="my-4 text-2xl font-bold">Transaction History</h1>
            <div className="h-full overflow-auto rounded-lg shadow-lg" id="table-container">
                <Suspense fallback={<Loading />}>
                    <HistoryTable />
                </Suspense>
            </div>
        </div>
    );
}
