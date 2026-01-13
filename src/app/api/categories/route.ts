import { NextResponse } from 'next/server';
import { listRootCategories } from '@/lib/ftp';

// Revalidate every 5 minutes (300 seconds) - allows dynamic updates without redeployment
export const revalidate = 300;

export async function GET() {
    try {
        const categories = await listRootCategories();

        return NextResponse.json({
            success: true,
            data: categories,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('FTP Error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch categories from FTP server',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
