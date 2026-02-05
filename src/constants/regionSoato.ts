/**
 * Hududlar (viloyatlar) SOATO kodlari.
 * MapContainer region kodlari (AN, BX, FR...) bilan moslashtirilgan.
 */
export enum RegionSoato {
    /** Andijon viloyati */
    AN = 1703,
    /** Buxoro viloyati */
    BX = 1706,
    /** Jizzax viloyati */
    JZ = 1708,
    /** Qashqadaryo viloyati */
    QD = 1710,
    /** Navoiy viloyati */
    NV = 1712,
    /** Namangan viloyati */
    NM = 1714,
    /** Samarqand viloyati */
    SN = 1718,
    /** Sirdaryo viloyati */
    SR = 1724,
    /** Toshkent shahri */
    TN = 1726,
    /** Toshkent viloyati */
    TV = 1727,
    /** Farg'ona viloyati */
    FR = 1730,
    /** Xorazm viloyati */
    XR = 1733,
    /** Qoraqalpog'iston Respublikasi */
    QR = 1735,
    /** Surxondaryo viloyati */
    SD = 1722,
}

export type RegionCode = keyof typeof RegionSoato;

/** Region kodi bo'yicha SOATO ni olish */
export function getSoatoByRegionCode(code: string): number | undefined {
    return RegionSoato[code as RegionCode];
}

/** Region kodidan o'zbekcha nomni olish */
export const REGION_NAMES_UZ: Record<RegionCode, string> = {
    AN: "Andijon viloyati",
    BX: "Buxoro viloyati",
    JZ: "Jizzax viloyati",
    QD: "Qashqadaryo viloyati",
    NV: "Navoiy viloyati",
    NM: "Namangan viloyati",
    SN: "Samarqand viloyati",
    SR: "Sirdaryo viloyati",
    TN: "Toshkent shahri",
    TV: "Toshkent viloyati",
    FR: "Farg'ona viloyati",
    XR: "Xorazm viloyati",
    QR: "Qoraqalpog'iston Respublikasi",
    SD: "Surxondaryo viloyati",
};

export function getRegionNameUz(code: string): string {
    return REGION_NAMES_UZ[code as RegionCode] ?? "Ma'lumot yo'q";
}
