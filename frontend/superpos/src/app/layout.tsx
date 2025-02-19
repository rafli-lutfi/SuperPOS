import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import StoreProvider from "./StoreProvider";

const manrope = Manrope({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
    title: "SuperPOS",
    description: "The POS that's Actually Super!",
    icons: {
        icon: "/favicon.png",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <html lang="en">
                <body className={`${manrope.className} bg-background antialiased`}>
                    <div className="flex">
                        <Sidebar />
                        <main className="flex h-screen w-full justify-between">{children}</main>
                    </div>
                </body>
            </html>
        </StoreProvider>
    );
}
