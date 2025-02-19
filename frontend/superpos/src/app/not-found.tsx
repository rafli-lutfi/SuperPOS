import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="w-full max-w-md space-y-6">
                <svg
                    className="mx-auto h-40 w-40 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h2 className="text-4xl font-bold text-gray-900">404 - Not Found</h2>
                <p className="text-lg text-gray-600">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
                <Link
                    href="/"
                    className="inline-flex items-center rounded-md border border-transparent bg-interactive px-6 py-3 text-base font-medium text-white hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
