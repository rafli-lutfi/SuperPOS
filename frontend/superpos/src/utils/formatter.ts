import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";

const TIMEZONE = process.env.NEXT_PUBLIC_TIMEZONE || "Asia/Jakarta";

export function toIDRCurrency(nominal: number): string {
    return "Rp " + nominal.toLocaleString("id-ID");
}

export function truncateName(text: string, maxLength = 14): string {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }

    return text;
}

export function capitalizeEachWord(text: string) {
    return text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

export function formatDate(isoString: string) {
    return formatInTimeZone(isoString, TIMEZONE, "EEEE, dd-MM-yyyy HH:mm", { locale: id });
}
