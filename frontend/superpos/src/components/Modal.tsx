import React from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="max-h-[90vh] w-full max-w-[50vw] overflow-y-auto rounded-md border bg-white p-8 shadow-lg">
                <div className="text-center">{children}</div>
            </div>
        </div>
    );
}
