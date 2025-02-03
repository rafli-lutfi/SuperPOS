import React from "react";

export default function RightLayout({ children }: { children: React.ReactNode }) {
    return <aside className="h-screen w-1/3 border shadow bg-white flex flex-col">{children}</aside>;
}
