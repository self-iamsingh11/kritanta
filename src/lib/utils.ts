// Simple classname utility
type ClassValue = string | boolean | undefined | null | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
    return inputs
        .flat()
        .filter((x): x is string => typeof x === "string" && x.length > 0)
        .join(" ");
}

// Get asset URL with fallback
export function getAssetUrl(path: string, width = 400, height = 600): string {
    // Check if path starts with / (local asset)
    if (path && path.startsWith("/")) {
        return path;
    }
    // Return placeholder
    return `https://placehold.co/${width}x${height}?text=Poster`;
}

// Format price in INR
export function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);
}

// Calculate discount percentage
export function calculateDiscount(originalPrice: number, salePrice: number): number {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

// Generate unique ID
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}
