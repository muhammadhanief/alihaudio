
/**
 * Utility to handle basePath consistently across local dev and production.
 * This ensures fetch calls work regardless of whether you are on 
 * http://localhost:3000/ or https://domain.com/alihaudio/
 */

const BASE_PATH = "/alihaudio";
// const BASE_PATH = "";

export const getApiUrl = (endpoint: string) => {
    let [path, query] = endpoint.split('?');
    let cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Fix for trailingSlash: true in next.config.js
    // If it's a directory-based route (no file extension), add trailing slash
    if (!cleanPath.endsWith('/')) {
        const parts = cleanPath.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart && !lastPart.includes('.')) {
            cleanPath += '/';
        }
    }

    const finalEndpoint = query ? `${cleanPath}?${query}` : cleanPath;
    return `${BASE_PATH}${finalEndpoint}`;
};

export const getAssetUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;

    // REDIRECT: Paksa lewat API agar tidak kena 404 Apache/cPanel
    if (path.startsWith("/uploads/audio/")) {
        const fileName = path.replace("/uploads/audio/", "");
        return `${BASE_PATH}/api/audio/${fileName}`;
    }

    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${BASE_PATH}${cleanPath}`;
};
