import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/ToastContainer";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#1E1E1E",
};

export const metadata: Metadata = {
    title: {
        default: "Kritanta - Divine Wallpapers & Premium Downloads",
        template: "%s | Kritanta",
    },
    description:
        "Discover and download stunning divine wallpapers featuring Hindu gods and spiritual artwork. Free downloads and premium subscription for exclusive content.",
    keywords: [
        "wallpapers",
        "divine wallpapers",
        "hindu gods wallpapers",
        "spiritual wallpapers",
        "free downloads",
        "premium wallpapers",
        "desktop wallpapers",
        "mobile wallpapers",
        "Hanuman wallpapers",
        "Krishna wallpapers",
        "Shiva wallpapers",
    ],
    authors: [{ name: "Kritanta" }],
    creator: "Kritanta",
    publisher: "Kritanta",
    formatDetection: {
        email: false,
        telephone: false,
    },
    icons: {
        icon: "/favicon.svg",
        apple: "/favicon.svg",
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        siteName: "Kritanta",
        title: "Kritanta - Divine Wallpapers & Premium Downloads",
        description:
            "Discover and download stunning divine wallpapers. High-resolution artwork of Hindu gods for desktop & mobile.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kritanta - Divine Wallpapers & Premium Downloads",
        description:
            "Discover and download stunning divine wallpapers. High-resolution artwork of Hindu gods for desktop & mobile.",
    },
    robots: {
        index: true,
        follow: true,
    },
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <ToastContainer />
            </body>
        </html>
    );
}
