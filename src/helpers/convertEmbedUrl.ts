export const convertEmbedUrl = (url: string): string => {
    if (url.includes('youtube.com/embed/')) {
        return url;
    }

    const watchMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
    );
    if (watchMatch && watchMatch[1]) {
        return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }
    return url;
};
