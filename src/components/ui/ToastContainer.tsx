"use client";

import { ToastProvider } from "@/context/ToastContext";

export default function ToastContainer({
    children,
}: {
    children?: React.ReactNode;
}) {
    return <ToastProvider>{children}</ToastProvider>;
}
