import type { LevelRegionStatisticsItem } from '@/types';
import { REGION_NAMES_UZ } from './regionSoato';
import type { RegionCode } from './regionSoato';

/**
 * Hududlar kesimida – default qiymatlar (API bo'lmaganda).
 * Jami, OTM, ITM, Boshqalari, Ilmiy izlanuvchilar.
 */
const REGION_DEFAULT_VALUES: Record<
    RegionCode,
    { total: number; otm: number; itm: number; others: number; researchers: number }
> = {
    TN: { total: 137, otm: 43, itm: 90, others: 4, researchers: 13643 },
    TV: { total: 23, otm: 7, itm: 16, others: 0, researchers: 1696 },
    QR: { total: 8, otm: 5, itm: 3, others: 0, researchers: 777 },
    AN: { total: 7, otm: 6, itm: 1, others: 0, researchers: 1249 },
    BX: { total: 6, otm: 6, itm: 0, others: 0, researchers: 2436 },
    JZ: { total: 4, otm: 3, itm: 1, others: 0, researchers: 236 },
    NV: { total: 3, otm: 2, itm: 1, others: 0, researchers: 441 },
    NM: { total: 5, otm: 5, itm: 0, others: 0, researchers: 1323 },
    SD: { total: 6, otm: 5, itm: 1, others: 0, researchers: 705 },
    SN: { total: 14, otm: 10, itm: 4, others: 0, researchers: 2300 },
    QD: { total: 5, otm: 4, itm: 1, others: 0, researchers: 577 },
    SR: { total: 2, otm: 2, itm: 0, others: 0, researchers: 466 },
    FR: { total: 7, otm: 7, itm: 0, others: 0, researchers: 1326 },
    XR: { total: 4, otm: 3, itm: 1, others: 0, researchers: 1032 },
};

const REGION_ORDER: RegionCode[] = [
    'TN',
    'TV',
    'QR',
    'AN',
    'BX',
    'JZ',
    'NV',
    'NM',
    'SD',
    'SN',
    'QD',
    'SR',
    'FR',
    'XR',
];

export const DEFAULT_LEVEL_REGION_STATISTICS: LevelRegionStatisticsItem[] =
    REGION_ORDER.map((region_code) => {
        const v = REGION_DEFAULT_VALUES[region_code];
        return {
            region_code,
            region_name: REGION_NAMES_UZ[region_code],
            total: v.total,
            otm: v.otm,
            itm: v.itm,
            others: v.others,
            researchers: v.researchers,
        };
    });
