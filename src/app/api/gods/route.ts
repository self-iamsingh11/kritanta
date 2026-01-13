import { NextResponse } from 'next/server';
import { getAllGodSections } from '@/lib/ftp';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const sections = await getAllGodSections();

        return NextResponse.json({
            success: true,
            data: sections,
        });
    } catch (error) {
        console.error('FTP Error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch god sections from FTP server',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
