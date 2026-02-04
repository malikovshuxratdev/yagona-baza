export const convertName = (fullName: string): string => {
    if (!fullName || typeof fullName !== 'string') {
        return '';
    }

    const nameParts = fullName.trim().split(/\s+/);

    if (nameParts.length < 2) {
        return fullName;
    }

    const surname = nameParts[0].toLowerCase();
    const firstName = nameParts[1];

    const firstTwoChars = firstName.slice(0, 2).toUpperCase();
    const isDigraph = ['SH', 'CH'].includes(firstTwoChars);
    const firstLetter = isDigraph
        ? firstTwoChars
        : firstName.charAt(0).toUpperCase();
    const formattedFirstName =
        surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase();

    return `${firstLetter}.${formattedFirstName}`;
};

export const convertFirstTwoParts = (fullName: string): string => {
    if (!fullName || typeof fullName !== 'string') {
        return '';
    }

    const nameParts = fullName.trim().split(/\s+/);

    if (nameParts.length < 2) {
        return fullName;
    }

    const surname = nameParts[0];
    const firstName = nameParts[1];

    return `${surname} ${firstName}`;
};

export type NameType = {
    en?: string | null;
    ru?: string | null;
    uz?: string | null;
};

/**
 * Gets text by language with fallback logic:
 * 1. If all languages (uz, ru, en) are available (not empty), use currentLanguage
 * 2. Otherwise, fallback priority: uz -> ru -> en
 */

export const getNameByLanguage = (
    name: NameType | null | undefined,
    currentLanguage: 'en' | 'ru' | 'uz'
): string => {
    if (!name) {
        return '';
    }

    // Helper function to check if a string is not empty
    const isNotEmpty = (str: string | null | undefined): boolean => {
        return str !== null && str !== undefined && str.trim() !== '';
    };

    // Check if all languages are available
    const hasUz = isNotEmpty(name.uz);
    const hasRu = isNotEmpty(name.ru);
    const hasEn = isNotEmpty(name.en);

    // If all languages are available, use currentLanguage
    if (hasUz && hasRu && hasEn) {
        const currentLangValue = name[currentLanguage];
        return isNotEmpty(currentLangValue) ? currentLangValue! : '';
    }

    // Fallback priority: uz -> ru -> en
    if (hasUz) {
        return name.uz!;
    }
    if (hasRu) {
        return name.ru!;
    }
    if (hasEn) {
        return name.en!;
    }

    return '';
};
