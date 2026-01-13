import { NextRequest, NextResponse } from 'next/server';
import { listCategoryCollections, listRootCategories } from '@/lib/ftp';

// Revalidate every 5 minutes (300 seconds) - allows dynamic updates without redeployment
export const revalidate = 300;

export async function GET(
    request: NextRequest,
    { params }: { params: { category: string } }
) {
    try {
        const categoryId = params.category;

        // Get all categories to find the matching one and verify it exists
        const categories = await listRootCategories();
        const matchingCategory = categories.find(cat =>
            cat.id === categoryId.toLowerCase() ||
            cat.name.toLowerCase() === categoryId.toLowerCase()
        );

        if (!matchingCategory) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Category not found',
                },
                { status: 404 }
            );
        }

        // Get all collections within this category
        const collections = await listCategoryCollections(categoryId);

        return NextResponse.json({
            success: true,
            data: {
                category: matchingCategory,
                collections: collections.map(c => ({
                    id: c.id,
                    name: c.name,
                    imageCount: c.imageCount,
                    previewImage: c.images[0], // First image as preview
                })),
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Category fetch error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch category from FTP server',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
