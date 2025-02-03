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
