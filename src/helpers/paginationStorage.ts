
const STORAGE_PREFIX = 'pagination_';

export const getPaginationFromStorage = (key: string): { page: number; page_size: number } | null => {
    try {
        const stored = sessionStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                page: parsed.page || 1,
                page_size: parsed.page_size || 20,
            };
        }
    } catch (error) {
        console.error('Error reading pagination from storage:', error);
    }
    return null;
};

export const savePaginationToStorage = (key: string, page: number, page_size: number): void => {
    try {
        sessionStorage.setItem(
            `${STORAGE_PREFIX}${key}`,
            JSON.stringify({ page, page_size })
        );
    } catch (error) {
        console.error('Error saving pagination to storage:', error);
    }
};

export const clearPaginationFromStorage = (key: string): void => {
    try {
        sessionStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
        console.error('Error clearing pagination from storage:', error);
    }
};
