import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";

const TIMEZONE = process.env.NEXT_PUBLIC_TIMEZONE || "Asia/Jakarta";

export function toIDRCurrency(nominal: number): string {
    return "Rp " + nominal.toLocaleString("id-ID");
}

export function truncateName(text: string, maxLength = 14): string {
    if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }

    return text;
}

export function capitalizeEachWord(text: string) {
    if (text) {
        return text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }
    return text;
}

export function formatDate(isoString: string) {
    return formatInTimeZone(isoString, TIMEZONE, "EEEE, dd-MM-yyyy HH:mm", { locale: id });
}

export function isValidUrl(url?: string | null): boolean {
    try {
        // Attempt to create a URL object
        if (url) {
            new URL(url);
            return true; // If successful, it's a valid URL
        }
        return false;
    } catch {
        return false; // If an error is thrown, it's not a valid URL
    }
}
