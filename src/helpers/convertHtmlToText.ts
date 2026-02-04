const baseUrl = import.meta.env.VITE_BASE_URL;

export const processHtmlImages = (html: string | undefined | null): string => {
    if (!html) return '';

    if (!baseUrl) return html;

    const url = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    return html.replace(
        /<img\s+([^>]*?)src\s*=\s*["'](?!http|https|data:)([^"']+)["']/gi,
        (_match, beforeSrc, src) => {
            const fullSrc = src.startsWith('/') ? src : `/${src}`;
            return `<img ${beforeSrc}src="${url}${fullSrc}"`;
        }
    );
};

export const convertHtmlToText = (html: string | undefined | null): string => {
    if (!html) return '';

    // Remove all HTML tags including style and script tags
    let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    text = text.replace(/<[^>]+>/g, '');

    // Decode HTML entities
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    text = tempDiv.textContent || tempDiv.innerText || '';

    // Decode additional HTML entities
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    text = textarea.value;

    // Normalize whitespace
    text = text.replace(/[\s\n\r\t]+/g, ' ');

    return text.trim();
};
