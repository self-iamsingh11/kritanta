"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Upload, X, RotateCw, Crop, Wand2, Check, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

const sizes = [
    { id: "A6", label: "A6", price: 99, dimensions: "4.1 x 5.8 in" },
    { id: "A5", label: "A5", price: 149, dimensions: "5.8 x 8.3 in" },
    { id: "A4", label: "A4", price: 199, dimensions: "8.3 x 11.7 in" },
    { id: "A3", label: "A3", price: 299, dimensions: "11.7 x 16.5 in" },
    { id: "13x19", label: "13x19", price: 399, dimensions: "13 x 19 in" },
];

export default function CustomPosterPage() {
    const [selectedSize, setSelectedSize] = useState(sizes[2]); // Default A4
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [rotation, setRotation] = useState(0);
    const [agreed, setAgreed] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addToCart } = useCart();

    const handleFileChange = (file: File | null) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setErrorMessage("Please upload an image file");
            setShowError(true);
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setErrorMessage("File size must be less than 10MB");
            setShowError(true);
            return;
        }

        setShowError(false);
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const removeImage = () => {
        setUploadedImage(null);
        setFileName("");
        setRotation(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRotate = () => {
        setRotation((prev) => (prev + 90) % 360);
    };

    const handleAddToCart = () => {
        // Validation
        if (!uploadedImage) {
            setErrorMessage("It is critical to upload an image during the process");
            setShowError(true);
            return;
        }

        if (!agreed) {
            setErrorMessage("Please confirm that you own the rights to this image");
            setShowError(true);
            return;
        }

        // Create custom product
        const customProduct = {
            id: `custom-${Date.now()}`,
            title: `Custom Poster - ${selectedSize.label}`,
            vendor: "KRITANTA",
            price: selectedSize.price,
            image: uploadedImage,
            category: "Custom",
            sizes: [selectedSize.id],
        };

        addToCart(customProduct, selectedSize.id);

        // Reset form
        removeImage();
        setAgreed(false);
        setShowError(false);
    };

    return (
        <div className="pt-[104px] min-h-screen bg-ui-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal uppercase tracking-tight mb-4">
                        Customize Your Wall
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Upload your favorite image and we&apos;ll transform it into a stunning
                        high-quality poster. Perfect for personalized gifts or custom wall art.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column - Upload & Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Upload Zone */}
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`relative border-2 border-dashed rounded-xl transition-all ${isDragging
                                ? "border-brand-mustard bg-brand-mustard/10"
                                : showError && !uploadedImage
                                    ? "border-brand-red bg-red-50"
                                    : "border-gray-300 hover:border-brand-charcoal"
                                } ${uploadedImage ? "p-4" : "p-12"}`}
                        >
                            {uploadedImage ? (
                                <div className="space-y-4">
                                    {/* Preview */}
                                    <div className="relative aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden">
                                        <Image
                                            src={uploadedImage}
                                            alt="Custom poster preview"
                                            fill
                                            className="object-contain transition-transform duration-300"
                                            style={{ transform: `rotate(${rotation}deg)` }}
                                        />
                                    </div>

                                    {/* File Info & Actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Check className="w-4 h-4 text-green-600" />
                                            <span className="truncate max-w-[200px]">{fileName}</span>
                                        </div>
                                        <button
                                            onClick={removeImage}
                                            className="text-gray-400 hover:text-brand-red transition-colors"
                                            aria-label="Remove image"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Editing Tools */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleRotate}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <RotateCw className="w-4 h-4" />
                                            Rotate
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                                            <Crop className="w-4 h-4" />
                                            Crop
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                                            <Wand2 className="w-4 h-4" />
                                            Enhance
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Upload
                                        className={`w-16 h-16 mx-auto mb-4 ${isDragging ? "text-brand-mustard" : "text-gray-400"
                                            }`}
                                    />
                                    <h3 className="font-bold text-lg mb-2">
                                        {isDragging ? "Drop your image here" : "Upload Your Image"}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Drag and drop or click to browse
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-block px-6 py-3 bg-brand-charcoal text-white font-bold uppercase text-sm tracking-wide rounded cursor-pointer hover:bg-brand-charcoal/90 transition-all"
                                    >
                                        Choose File
                                    </label>
                                    <p className="text-xs text-gray-400 mt-4">
                                        Supports: JPG, PNG, WEBP • Max size: 10MB
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Error Message */}
                        {showError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 bg-red-50 border border-brand-red rounded-lg flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                                <p className="text-brand-red text-sm">{errorMessage}</p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right Column - Options */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        {/* Size Selector */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Select Size</h3>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedSize.id === size.id
                                            ? "bg-brand-charcoal text-white"
                                            : "bg-white border border-gray-300 hover:border-brand-charcoal"
                                            }`}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-3">
                                Dimensions: {selectedSize.dimensions}
                            </p>
                        </div>

                        {/* Price Display */}
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <div className="flex items-baseline justify-between mb-4">
                                <span className="text-gray-600">Price</span>
                                <span className="text-3xl font-bold text-brand-charcoal">
                                    {formatPrice(selectedSize.price)}
                                </span>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    Premium quality print
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    Matte/Glossy finish available
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    Ships within 3-5 days
                                </li>
                            </ul>
                        </div>

                        {/* Agreement Checkbox */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="rights-agreement"
                                checked={agreed}
                                onChange={(e) => {
                                    setAgreed(e.target.checked);
                                    if (e.target.checked) setShowError(false);
                                }}
                                className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-red focus:ring-brand-red cursor-pointer"
                            />
                            <label htmlFor="rights-agreement" className="text-sm text-gray-600 cursor-pointer">
                                I confirm I own the rights to this content and it contains no
                                explicit or copyrighted material. I understand that Kritanta
                                reserves the right to reject inappropriate content.
                            </label>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 bg-brand-red text-white font-bold uppercase tracking-wide text-lg rounded-lg hover:brightness-90 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Add to Cart • {formatPrice(selectedSize.price)}
                        </button>

                        {/* Additional Info */}
                        <div className="p-4 bg-brand-mustard/20 rounded-lg">
                            <p className="text-sm text-brand-charcoal">
                                <strong>💡 Pro Tip:</strong> For best results, upload images with a
                                resolution of at least 300 DPI. Higher resolution = sharper prints!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
