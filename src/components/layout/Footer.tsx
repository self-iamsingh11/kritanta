"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, Download, Shield, Smartphone, Star } from "lucide-react";

const footerLinks = {
    quickLinks: [
        { label: "Browse Wallpapers", href: "/" },
        { label: "Premium", href: "/premium" },
        { label: "Contact Us", href: "/pages/contact" },
        { label: "FAQ", href: "/pages/faq" },
    ],
    policies: [
        { label: "Privacy Policy", href: "/policies/privacy" },
        { label: "Terms of Service", href: "/policies/terms" },
        { label: "Content Guidelines", href: "/policies/content" },
    ],
};

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Newsletter signup logic would go here
        alert("Thanks for subscribing!");
        setEmail("");
    };

    return (
        <footer className="bg-brand-charcoal text-white">
            {/* Trust Badges */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brand-mustard/20 rounded-full flex items-center justify-center">
                                <Download className="w-6 h-6 text-brand-mustard" />
                            </div>
                            <div>
                                <span className="font-bold block">Free Downloads</span>
                                <span className="text-sm text-gray-400">No signup required</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brand-mustard/20 rounded-full flex items-center justify-center">
                                <Star className="w-6 h-6 text-brand-mustard" />
                            </div>
                            <div>
                                <span className="font-bold block">High Resolution</span>
                                <span className="text-sm text-gray-400">4K+ quality images</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brand-mustard/20 rounded-full flex items-center justify-center">
                                <Smartphone className="w-6 h-6 text-brand-mustard" />
                            </div>
                            <div>
                                <span className="font-bold block">All Devices</span>
                                <span className="text-sm text-gray-400">Desktop & Mobile</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brand-mustard/20 rounded-full flex items-center justify-center">
                                <Shield className="w-6 h-6 text-brand-mustard" />
                            </div>
                            <div>
                                <span className="font-bold block">Premium Content</span>
                                <span className="text-sm text-gray-400">Exclusive artwork</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-display text-2xl font-bold mb-4">KRITANTA</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Your destination for divine wallpapers. Download high-resolution
                            artwork of Hindu gods and spiritual imagery for your desktop and mobile.
                        </p>
                        <p className="text-gray-400 text-sm">
                            <strong className="text-white">50,000+</strong> Downloads & Growing
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 uppercase tracking-wide">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-brand-mustard transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 uppercase tracking-wide">
                            Policies
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.policies.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-brand-mustard transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 uppercase tracking-wide">
                            Stay Updated
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get notified about new wallpaper releases and exclusive content.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-mustard"
                            />
                            <button
                                type="submit"
                                className="px-4 bg-brand-red hover:brightness-90 rounded-r-lg transition-all"
                                aria-label="Subscribe"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2024 Kritanta. All rights reserved. Made with ❤️ for devotees worldwide.
                        </p>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <span>Free wallpapers for personal use</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
