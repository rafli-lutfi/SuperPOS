import React from "react";

export default function RightLayout({ children }: { children: React.ReactNode }) {
    return <aside className="flex h-screen w-1/3 flex-col border bg-white shadow">{children}</aside>;
}
