import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'basic-ftp';
import { Readable } from 'stream';

// FTP connection configuration from environment variables
const FTP_CONFIG = {
    host: process.env.FTP_HOST || '',
    user: process.env.FTP_USERNAME || '',
    password: process.env.FTP_PASSWORD || '',
    secure: false,
};

// Base path on the FTP server (root level, paths include category/collection/filename)
const FTP_BASE_PATH = '/';

// In-memory cache for images (for production, use Redis or similar)
const imageCache = new Map<string, { data: Buffer; contentType: string; timestamp: number }>();
const CACHE_TTL = 3600000; // 1 hour in milliseconds

/**
 * GET /api/image/[...path]
 * Serves images from the FTP server
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        const pathSegments = params.path;
        if (!pathSegments || pathSegments.length < 2) {
            return NextResponse.json(
                { error: 'Invalid image path' },
                { status: 400 }
            );
        }

        const imagePath = `${FTP_BASE_PATH}/${pathSegments.join('/')}`;
        const cacheKey = imagePath;

        // Check cache first
        const cached = imageCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            return new NextResponse(new Uint8Array(cached.data), {
                headers: {
                    'Content-Type': cached.contentType,
                    'Cache-Control': 'public, max-age=3600',
                    'X-Cache': 'HIT',
                },
            });
        }

        // Fetch from FTP
        const client = new Client();
        client.ftp.verbose = false;

        await client.access({
            host: FTP_CONFIG.host,
            user: FTP_CONFIG.user,
            password: FTP_CONFIG.password,
            secure: FTP_CONFIG.secure,
        });

        // Download file to buffer
        const chunks: Buffer[] = [];
        const writable = new (require('stream').Writable)({
            write(chunk: Buffer, encoding: string, callback: () => void) {
                chunks.push(chunk);
                callback();
            },
        });

        await client.downloadTo(writable, imagePath);
        client.close();

        const imageBuffer = Buffer.concat(chunks);

        // Determine content type based on file extension
        const fileName = pathSegments[pathSegments.length - 1].toLowerCase();
        let contentType = 'image/png';
        if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
            contentType = 'image/jpeg';
        } else if (fileName.endsWith('.gif')) {
            contentType = 'image/gif';
        } else if (fileName.endsWith('.webp')) {
            contentType = 'image/webp';
        }

        // Cache the image
        imageCache.set(cacheKey, {
            data: imageBuffer,
            contentType,
            timestamp: Date.now(),
        });

        // Clean up old cache entries
        Array.from(imageCache.entries()).forEach(([key, value]) => {
            if (Date.now() - value.timestamp > CACHE_TTL) {
                imageCache.delete(key);
            }
        });

        return new NextResponse(new Uint8Array(imageBuffer), {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600',
                'X-Cache': 'MISS',
            },
        });
    } catch (error) {
        console.error('Image fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch image' },
            { status: 500 }
        );
    }
}
