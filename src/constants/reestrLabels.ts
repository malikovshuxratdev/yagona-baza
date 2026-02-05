/**
 * Inglizcha label → o'zbekcha tarjima (reestr org class va passport template uchun).
 * Kalitlar normalizeLabelKey() chiqishiga mos (kichik harf, bo'shliq o'rniga _).
 */
const REESTR_LABEL_UZ: Record<string, string> = {
    // Tashkilot sinflari (org_class) — API dan keladigan label'lar
    education_organization: "Ta'lim tashkiloti",
    science_organization: 'Ilmiy tashkilot',
    innovation_service_organization: "Innovatsion xizmat ko'rsatuvchi tashkilot",
    commercial_organization: "Kommersiya tashkiloti",
    societal_organization: 'Ijtimoiy tashkilot',
    regulatory_organization: 'Regulyator tashkilot',
    associative_organization: 'Assotsiativ tashkilot',
    // Eski variantlar (passport template yoki boshqa API uchun)
    scientific_organization: 'Ilmiy tashkilot',
    innovative_service_provider_organization: "Innovatsion xizmat ko'rsatuvchi tashkilot",
    social_organization: 'Ijtimoiy tashkilot',

    // Passport template — A class (Ta'lim tashkiloti) — API dan keladigan label'lar
    higher_education: "Oliy ta'lim",
    'professional/vocational_education': "Professional / kasbiy ta'lim",
    'general_secondary_/_secondary_specialized': "Umumiy o'rta / o'rta maxsus",
    pre_school_education: "Maktabgacha ta'lim",
    'specialized_training_&_retraining': "Qayta tayyorlash va malaka oshirish",
    lifelong_education: "Uzluksiz ta'lim",
    // Qo'shimcha variantlar
    professional_education: "Professional / kasbiy ta'lim",
    'professional_/_vocational_education': "Professional / kasbiy ta'lim",
    vocational_education: "Kasbiy ta'lim",
    general_secondary_education: "Umumiy o'rta ta'lim",
    'general_secondary_/_specialized_secondary': "Umumiy o'rta / o'rta maxsus",
    specialized_secondary: "O'rta maxsus",
    preschool_education: "Maktabgacha ta'lim",
    retraining_and_skill_upgrading: "Qayta tayyorlash va malaka oshirish",
    continuous_education: "Uzluksiz ta'lim",

    // B class (Ilmiy tashkilot) — passport template
    state_academic_science: 'Davlat akademik fan',
    state_departmental_science: 'Davlat idoraviy fan',
    public_academy_science: 'Davlat akademik fan',
    public_departmental_science: 'Davlat idoraviy fan',
    university_science: 'Universitet fani',
    corporate_science: 'Korporativ fan',
    independent_science: 'Mustaqil fan',

    // C class (Innovatsion xizmat) — passport template
    innovation_financial_service_organization: "Innovatsion moliyaviy xizmat tashkiloti",
    innovation_non_financial_service_organizations: "Innovatsion no-moliyaviy xizmat tashkilotlari",

    // D class (Kommersiya) — passport template
    commercial_organizations: "Kommersiya tashkilotlari",

    // E class (Ijtimoiy) — passport template
    healthcare_organization: "Sog'liqni saqlash tashkiloti",
    environment_protection_organization: "Atrof-muhitni muhofaza qilish tashkiloti",
    social_support_organization: "Ijtimoiy yordam tashkiloti",
    cultural_organization: "Madaniy tashkilot",

    // F class (Regulyator) — passport template
    public_regulator_organizations: "Davlat regulyator tashkilotlari",
    private_or_non_profit_regulator_organizations: "Xususiy yoki nodavlat regulyator tashkilotlari",

    // G class (Assotsiativ) — passport template
    public_associative_organization: "Davlat assotsiativ tashkiloti",
    public_or_non_profit_associative_organization: "Davlat yoki nodavlat assotsiativ tashkilot",
};

/**
 * Label dan map kalitini hosil qilish (bo'shliq, tire, camelCase ni _ ga keltiradi).
 */
function normalizeLabelKey(s: string): string {
    return s
        .trim()
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/-/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}

/**
 * Inglizcha label ni o'zbekchaga o'giradi. Topilmasa asl matn qaytariladi.
 */
export function getReestrLabelUz(label: string | undefined | null): string {
    if (label == null || label === '') return '';
    const key = normalizeLabelKey(label);
    return REESTR_LABEL_UZ[key] ?? label;
}
