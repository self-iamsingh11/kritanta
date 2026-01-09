import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import ToastContainer from "@/components/ui/ToastContainer";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#1E1E1E",
};

export const metadata: Metadata = {
    title: {
        default: "Kritanta - Premium Wall Art & Custom Posters",
        template: "%s | Kritanta",
    },
    description:
        "India's No. 1 custom poster selling site. Shop premium wall art, anime posters, music posters, and create your own custom designs.",
    keywords: [
        "posters",
        "wall art",
        "custom posters",
        "anime posters",
        "music posters",
        "home decor",
        "India",
        "buy posters online",
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
        title: "Kritanta - Premium Wall Art & Custom Posters",
        description:
            "Transform your space with stunning wall art. Custom posters, anime art, spiritual designs & more.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kritanta - Premium Wall Art & Custom Posters",
        description:
            "Transform your space with stunning wall art. Custom posters, anime art, spiritual designs & more.",
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
                <CartProvider>
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                    <CartDrawer />
                    <ToastContainer />
                </CartProvider>
            </body>
        </html>
    );
}
