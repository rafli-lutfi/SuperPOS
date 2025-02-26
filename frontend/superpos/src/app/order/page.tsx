import React, { Suspense } from "react";
import RightLayout from "@/components/Right";
import Cart from "./_components/Cart";
import Catalog from "./_components/Catalog";
import Loading from "@/components/Loading";

export default function OrderPage() {
    return (
        <>
            <div className="mx-6 h-full w-2/3 overflow-y-auto" id="scrollable">
                <Suspense fallback={<Loading />}>
                    <Catalog />
                </Suspense>
            </div>
            <RightLayout>
                <Cart />
            </RightLayout>
        </>
    );
}
