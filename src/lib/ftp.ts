import { Client, FileInfo } from 'basic-ftp';

// FTP connection configuration from environment variables
const FTP_CONFIG = {
    host: process.env.FTP_HOST || '',
    user: process.env.FTP_USERNAME || '',
    password: process.env.FTP_PASSWORD || '',
    secure: false,
};

// Base path on the FTP server (root level where all categories exist)
const FTP_BASE_PATH = '/';

// API endpoint for serving images (internal proxy)
const PUBLIC_URL_BASE = '/api/image';

export interface CategoryInfo {
    id: string;
    name: string;
    previewImage?: string;
    collectionCount: number;
}

export interface CollectionInfo {
    id: string;
    name: string;
    category: string;
    images: string[];
    imageCount: number;
}

export interface GodSection {
    id: string;
    name: string;
    images: string[];
}

/**
 * Creates and connects an FTP client
 */
async function createFtpClient(): Promise<Client> {
    const client = new Client();
    client.ftp.verbose = false;

    await client.access({
        host: FTP_CONFIG.host,
        user: FTP_CONFIG.user,
        password: FTP_CONFIG.password,
        secure: FTP_CONFIG.secure,
    });

    return client;
}

/**
 * Lists all root-level categories from the FTP server
 * Categories are top-level folders like Gods, SuperHero, Anime, etc.
 */
export async function listRootCategories(): Promise<CategoryInfo[]> {
    const client = await createFtpClient();

    try {
        const list: FileInfo[] = await client.list(FTP_BASE_PATH);
        const folders = list
            .filter((item: FileInfo) => item.isDirectory)
            .map((item: FileInfo) => item.name)
            .filter((name: string) => !name.startsWith('.') && !name.startsWith('_')); // Exclude hidden/system folders

        const categories: CategoryInfo[] = [];

        for (const folder of folders) {
            // Get subcollections count
            try {
                const subList: FileInfo[] = await client.list(`${FTP_BASE_PATH}${folder}`);
                const subfolders = subList.filter((item: FileInfo) => item.isDirectory && !item.name.startsWith('.'));

                // Get a preview image from the first subcollection
                let previewImage: string | undefined;
                if (subfolders.length > 0) {
                    const firstSubfolder = subfolders[0].name;
                    const images = await client.list(`${FTP_BASE_PATH}${folder}/${firstSubfolder}`);
                    const firstImage = images.find((img: FileInfo) =>
                        img.isFile && /\.(png|jpg|jpeg|webp|gif)$/i.test(img.name)
                    );
                    if (firstImage) {
                        previewImage = `${PUBLIC_URL_BASE}/${encodeURIComponent(folder)}/${encodeURIComponent(firstSubfolder)}/${encodeURIComponent(firstImage.name)}`;
                    }
                }

                categories.push({
                    id: folder.toLowerCase().replace(/\s+/g, '-'),
                    name: folder,
                    previewImage,
                    collectionCount: subfolders.length,
                });
            } catch (err) {
                // If we can't read the folder, skip it
                console.warn(`Could not read category folder: ${folder}`, err);
            }
        }

        return categories;
    } finally {
        client.close();
    }
}

/**
 * Lists all collections (subfolders) within a specific category
 */
export async function listCategoryCollections(category: string): Promise<CollectionInfo[]> {
    const client = await createFtpClient();

    try {
        // Find the actual folder name (case-insensitive match)
        const rootList: FileInfo[] = await client.list(FTP_BASE_PATH);
        const matchingFolder = rootList.find((item: FileInfo) =>
            item.isDirectory &&
            (item.name.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase() ||
                item.name.toLowerCase() === category.toLowerCase())
        );

        if (!matchingFolder) {
            return [];
        }

        const categoryPath = `${FTP_BASE_PATH}${matchingFolder.name}`;
        const list: FileInfo[] = await client.list(categoryPath);
        const folders = list
            .filter((item: FileInfo) => item.isDirectory)
            .filter((item: FileInfo) => !item.name.startsWith('.'));

        const collections: CollectionInfo[] = [];

        for (const folder of folders) {
            const folderPath = `${categoryPath}/${folder.name}`;
            const imageList: FileInfo[] = await client.list(folderPath);

            const images = imageList
                .filter((item: FileInfo) => item.isFile && /\.(png|jpg|jpeg|webp|gif)$/i.test(item.name))
                .map((item: FileInfo) =>
                    `${PUBLIC_URL_BASE}/${encodeURIComponent(matchingFolder.name)}/${encodeURIComponent(folder.name)}/${encodeURIComponent(item.name)}`
                );

            if (images.length > 0) {
                collections.push({
                    id: folder.name.toLowerCase().replace(/\s+/g, '-'),
                    name: folder.name,
                    category: matchingFolder.name,
                    images,
                    imageCount: images.length,
                });
            }
        }

        return collections;
    } finally {
        client.close();
    }
}

/**
 * Gets a specific collection with all its images
 */
export async function getCollection(category: string, collectionId: string): Promise<CollectionInfo | null> {
    const client = await createFtpClient();

    try {
        // Find the actual category folder name
        const rootList: FileInfo[] = await client.list(FTP_BASE_PATH);
        const matchingCategory = rootList.find((item: FileInfo) =>
            item.isDirectory &&
            (item.name.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase() ||
                item.name.toLowerCase() === category.toLowerCase())
        );

        if (!matchingCategory) {
            return null;
        }

        const categoryPath = `${FTP_BASE_PATH}${matchingCategory.name}`;
        const folderList: FileInfo[] = await client.list(categoryPath);

        // Find matching collection folder
        const matchingCollection = folderList.find((item: FileInfo) =>
            item.isDirectory &&
            (item.name.toLowerCase().replace(/\s+/g, '-') === collectionId.toLowerCase() ||
                item.name.toLowerCase() === collectionId.toLowerCase())
        );

        if (!matchingCollection) {
            return null;
        }

        const collectionPath = `${categoryPath}/${matchingCollection.name}`;
        const imageList: FileInfo[] = await client.list(collectionPath);

        const images = imageList
            .filter((item: FileInfo) => item.isFile && /\.(png|jpg|jpeg|webp|gif)$/i.test(item.name))
            .map((item: FileInfo) =>
                `${PUBLIC_URL_BASE}/${encodeURIComponent(matchingCategory.name)}/${encodeURIComponent(matchingCollection.name)}/${encodeURIComponent(item.name)}`
            );

        return {
            id: collectionId,
            name: matchingCollection.name,
            category: matchingCategory.name,
            images,
            imageCount: images.length,
        };
    } finally {
        client.close();
    }
}

// ============================================
// LEGACY FUNCTIONS (backward compatibility)
// ============================================

/**
 * Lists all God folders from the FTP server
 * @deprecated Use listCategoryCollections('gods') instead
 */
export async function listGodFolders(): Promise<string[]> {
    const collections = await listCategoryCollections('gods');
    return collections.map(c => c.name);
}

/**
 * Lists all PNG images in a specific God folder
 * @deprecated Use getCollection('gods', folderName) instead
 */
export async function listGodImages(folderName: string): Promise<string[]> {
    const collection = await getCollection('gods', folderName);
    return collection?.images || [];
}

/**
 * Fetches all God sections with their images
 * @deprecated Use listCategoryCollections('gods') instead
 */
export async function getAllGodSections(): Promise<GodSection[]> {
    const collections = await listCategoryCollections('gods');
    return collections.map(c => ({
        id: c.id,
        name: c.name,
        images: c.images,
    }));
}
