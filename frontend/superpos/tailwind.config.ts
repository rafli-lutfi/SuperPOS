import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                highlight: "var(--highlight)",
                "main-text": "var(--main-text)",
                "secondary-text": "var(--secondary-text)",
                error: "var(--error)",
                interactive: "var(--interactive)",
            },
            screens: {
                tablet: "600px",
                laptop: "1024px",
            },
        },
    },
    plugins: [],
} satisfies Config;
