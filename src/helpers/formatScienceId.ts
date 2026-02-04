export const formatScienceId = (value: string): string => {
    value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const letters = value.slice(0, 3).replace(/[^A-Z]/g, '');
    let numbers = value.slice(3).replace(/[^0-9]/g, '');
    if (numbers.length > 8) numbers = numbers.slice(0, 8);
    let formatted = letters;
    if (numbers.length > 0) {
        formatted += '-' + numbers.slice(0, 4);
    }
    if (numbers.length > 4) {
        formatted += '-' + numbers.slice(4, 8);
    }
    return formatted;
};

export const formatOrcidId = (value: string): string => {
    const digits = value.replace(/\D/g, '');

    const limitedDigits = digits.slice(0, 16);

    const formatted = limitedDigits.replace(/(\d{4})(?=\d)/g, '$1-');

    return formatted;
};
