
/**
 * Utility to handle basePath consistently across local dev and production.
 * This ensures fetch calls work regardless of whether you are on 
 * http://localhost:3000/ or https://domain.com/alihaudio/
 */

const BASE_PATH = "/alihaudio";
// const BASE_PATH = "";

export const getApiUrl = (endpoint: string) => {
    // In development (localhost), Next.js usually handles the path if you use relative URLs
    // But since we enforced basePath in next.config.ts, we should use it consistently.
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

    // If we're on localhost and not using the basepath in the URL, fetch might need it or not
    // depending on the Next.js version. However, with basePath set in config, 
    // it's safest to include it.
    return `${BASE_PATH}${cleanEndpoint}`;
};

export const getAssetUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${BASE_PATH}${cleanPath}`;
};
