import { NextResponse } from "next/server";
import fs from "fs/promises"; // Use promise-based fs API
import path from "path";

// // const videoDirectory = path.join("D:/Downloads/Video");

// export async function GET() {
//     try {
//         const videoDirectory = path.join(process.cwd(), "public/videos");
//         const files = await fs.readdir(videoDirectory); // Await the promise

//         const videoFiles = files.filter((file) =>
//             /\.(mp4|mkv|avi|mov)$/i.test(file)
//         );

//         return NextResponse.json(videoFiles); // Respond with the video files
//     } catch (err) {
//         console.error("Error reading video directory:", err);
//         return NextResponse.json({ error: "Could not retrieve video files" }, { status: 500 });
//     }
// }

// Type definition for the recursive function
type VideoFile = string;

/**
 * Recursively retrieves video files from a directory and its subdirectories.
 * @param directory - The directory to start searching for video files.
 * @returns A promise that resolves to an array of video file paths.
 */
async function getFilesRecursively(directory: string): Promise<VideoFile[]> {
    let results: VideoFile[] = [];
    const files = await fs.readdir(directory, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if (file.isDirectory()) {
            // Recursively read subdirectories
            const subDirFiles = await getFilesRecursively(filePath);
            results = results.concat(subDirFiles);
        } else if (/\.(mp4|mkv|avi|mov)$/i.test(file.name)) {
            // Add valid video files
            results.push(filePath);
        }
    }

    return results;
}

/**
 * API handler for fetching video files.
 * @returns A NextResponse containing the list of video files.
 */
export async function GET(): Promise<NextResponse> {
    try {
        // Specify the video directory
        // const videoDirectory: string = path.join("D:/Downloads/Video");
        const videoDirectory: string = path.join(process.cwd(), "public/videos");

        const videoFiles: VideoFile[] = await getFilesRecursively(videoDirectory);

        // Convert absolute paths to relative paths
        const relativePaths: VideoFile[] = videoFiles.map((file) =>
            path.relative(videoDirectory, file)
        );

        return NextResponse.json(relativePaths);
    } catch (err) {
        console.error("Error reading video directory:", err);
        return NextResponse.json(
            { error: "Could not retrieve video files" },
            { status: 500 }
        );
    }
}
