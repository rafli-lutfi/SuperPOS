import React from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 h-screen w-full flex items-center justify-center">
            <div className="max-h-[90vh] p-8 border w-full max-w-[50vw] shadow-lg rounded-md bg-white overflow-y-auto">
                <div className="text-center">{children}</div>
            </div>
        </div>
    );
}
