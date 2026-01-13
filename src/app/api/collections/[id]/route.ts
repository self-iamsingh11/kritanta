import { NextRequest, NextResponse } from 'next/server';
import { listGodImages, listGodFolders } from '@/lib/ftp';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const collectionId = params.id;

        // Get all folder names to find the matching one
        const folders = await listGodFolders();

        // Find folder that matches the ID (case-insensitive, handle slugified IDs)
        const matchingFolder = folders.find(folder =>
            folder.toLowerCase().replace(/\s+/g, '-') === collectionId.toLowerCase() ||
            folder.toLowerCase() === collectionId.toLowerCase()
        );

        if (!matchingFolder) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Collection not found',
                },
                { status: 404 }
            );
        }

        // Get all images for this folder
        const images = await listGodImages(matchingFolder);

        return NextResponse.json({
            success: true,
            data: {
                id: collectionId,
                name: matchingFolder,
                images,
                count: images.length,
            },
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
