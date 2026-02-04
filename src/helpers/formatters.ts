/**
 * Format phone number to: +998 XX XXX XX XX
 * @param value - raw phone number (e.g., "998901234567" or "+998901234567")
 * @returns formatted phone number (e.g., "+998 90 123 45 67")
 */
export const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');

    if (digits.length === 0) return '';

    let formatted = '+998';
    if (digits.length > 3) {
        formatted += ' ' + digits.slice(3, 5);
    }
    if (digits.length > 5) {
        formatted += ' ' + digits.slice(5, 8);
    }
    if (digits.length > 8) {
        formatted += ' ' + digits.slice(8, 10);
    }
    if (digits.length > 10) {
        formatted += ' ' + digits.slice(10, 12);
    }

    return formatted;
};

/**
 * Format TIN (Taxpayer Identification Number) to: XXX XXX XXX (9 digits)
 * @param value - raw TIN number (e.g., "123456789")
 * @returns formatted TIN (e.g., "123 456 789")
 */
export const formatTIN = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 9);

    if (digits.length === 0) return '';

    let formatted = digits.slice(0, 3);
    if (digits.length > 3) {
        formatted += ' ' + digits.slice(3, 6);
    }
    if (digits.length > 6) {
        formatted += ' ' + digits.slice(6, 9);
    }

    return formatted;
};

/**
 * Format a number as currency with space-separated thousands (e.g. 10000 -> "10 000").
 * Accepts number or numeric string; returns an empty string for null/undefined/empty.
 */
export const formatPrice = (
    value: number | string | null | undefined
): string => {
    if (value === null || value === undefined) return '';

    const digits = String(value).replace(/\D/g, '');
    if (!digits) return '';

    // Return plain digits without any spaces (e.g. "10000")
    return digits;
};

/**
 * Format percentage with 2 decimal places (e.g. 88.88 -> "88.88")
 * @param value - percentage value (number or null)
 * @returns formatted percentage string with 2 decimal places
 */
export const formatPercentage = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '';
    return value.toFixed(2);
};

export const formatNumber = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined) return '';
    const num = Number(value);
    if (Number.isNaN(num)) return '';
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
};

