import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/ftp';

// Revalidate every 5 minutes (300 seconds) - allows dynamic updates without redeployment
export const revalidate = 300;

export async function GET(
    request: NextRequest,
    { params }: { params: { category: string; collection: string } }
) {
    try {
        const { category, collection: collectionId } = params;

        const collectionData = await getCollection(category, collectionId);

        if (!collectionData) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Collection not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: collectionData,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Collection fetch error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch collection from FTP server',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
