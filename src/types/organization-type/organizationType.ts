export type AcademicType = 'RESEARCH_INSTITUTE' | 'HIGHER_EDU';
export type OwnershipType = 'STATE' | 'PRIVATE' | 'FOREIGN' | 'JOINT';

export enum DcType {
    DOCTORATE = 100,                      // Doktorantura, DSc
    BASIC_DOCTORATE = 200,                // Tayanch doktorantura, PhD
    TRAINEE_RESEARCHER = 300,             // Stajyor-tadqiqotchi
    INDEPENDENT_DOCTORATE = 400,          // Mustaqil izlanuvchi, DSc
    INDEPENDENT_BASIC_DOCTORATE = 500,    // Mustaqil izlanuvchi, PhD
    TARGETED_DOCTORATE = 600,             // Maqsadli doktorantura, DSc
    TARGETED_BASIC_DOCTORATE = 700,       // Maqsadli tayanch doktorantura, PhD
    DOCTORATE_OUTSIDE = 800,              // Doktorantura DSc (kvotadan tashqari)
    BASIC_DOCTORATE_OUTSIDE = 900,        // Tayanch doktorantura PhD (kvotadan tashqari)
    TRAINEE_RESEARCHER_OUTSIDE = 1000,    // Stajyor-tadqiqotchi (kvotadan tashqari)
    DOCTORATE_FOREIGN = 1100,             // Doktorantura DSc (Shartnoma asosida)
    BASIC_DOCTORATE_FOREIGN = 1200,       // Tayanch doktorantura PhD (Shartnoma asosida)
    TRAINEE_RESEARCHER_FOREIGN = 1300,    // Stajyor-tadqiqotchi (Shartnoma asosida)
}

export const DC_TYPE_LABELS: Record<DcType, string> = {
    [DcType.DOCTORATE]:                   'Doktorantura (DSc)',
    [DcType.BASIC_DOCTORATE]:             'Tayanch doktorantura (PhD)',
    [DcType.TRAINEE_RESEARCHER]:          'Stajyor-tadqiqotchi',
    [DcType.INDEPENDENT_DOCTORATE]:       'Mustaqil izlanuvchi (DSc)',
    [DcType.INDEPENDENT_BASIC_DOCTORATE]: 'Mustaqil izlanuvchi (PhD)',
    [DcType.TARGETED_DOCTORATE]:          'Maqsadli doktorantura (DSc)',
    [DcType.TARGETED_BASIC_DOCTORATE]:    'Maqsadli tayanch doktorantura (PhD)',
    [DcType.DOCTORATE_OUTSIDE]:           'Doktorantura DSc (kvotadan tashqari)',
    [DcType.BASIC_DOCTORATE_OUTSIDE]:     'Tayanch doktorantura PhD (kvotadan tashqari)',
    [DcType.TRAINEE_RESEARCHER_OUTSIDE]:  'Stajyor-tadqiqotchi (kvotadan tashqari)',
    [DcType.DOCTORATE_FOREIGN]:           'Doktorantura DSc (shartnoma asosida)',
    [DcType.BASIC_DOCTORATE_FOREIGN]:     'Tayanch doktorantura PhD (shartnoma asosida)',
    [DcType.TRAINEE_RESEARCHER_FOREIGN]:  'Stajyor-tadqiqotchi (shartnoma asosida)',
};

export enum DoctorateCourse {
    COURSE_1 = 1,
    COURSE_2 = 2,
    COURSE_3 = 3,
}

export const DOCTORATE_COURSE_LABELS: Record<DoctorateCourse, string> = {
    [DoctorateCourse.COURSE_1]: '1-kurs',
    [DoctorateCourse.COURSE_2]: '2-kurs',
    [DoctorateCourse.COURSE_3]: '3-kurs',
};

export interface OrgListParams {
    page: number;
    page_size: number;
    academic_type?: AcademicType | '';
    name?: string;
    tin?: string;
}

export interface OrgListItem {
    id: number;
    tin: string;
    name: string;
    short_name: string;
    ownership_type: OwnershipType;
    academic_type: AcademicType;
    oked: string;
    opf: string;
    kfs: string;
    soogu: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface OrgListResponse {
    page: number;
    page_size: number;
    count: number;
    total_pages: number;
    items: OrgListItem[];
}

export interface OrgDirector {
    id: number;
    last_name: string;
    first_name: string;
    middle_name: string;
    pin: string;
    tin: string;
    passport_series: string;
    passport_number: string;
    phone: string;
    email: string | null;
    address: string;
    soato: number;
    created_at: string;
    updated_at: string;
}

export interface OrgAddress {
    id: number;
    type: 'billing' | 'shipping';
    street: string;
    soato: number;
    cadastre_number: string | null;
    postcode: string | null;
}

export interface OrgFounder {
    id: number;
    type: 'legal' | 'individual';
    soato: number | null;
    share_percent: string;
    share_sum: number;
    ind_last_name: string | null;
    ind_first_name: string | null;
    ind_middle_name: string | null;
    ind_pin: string | null;
    ind_tin: string | null;
    ind_passport_series: string | null;
    ind_passport_number: string | null;
    legal_name: string | null;
    legal_short_name: string | null;
    legal_tin: string | null;
}

export interface OrgDoctorate {
    id: number;
    year: number;
    type: number;
    course: number;
    count: number;
}

export interface OrgAcademicMobility {
    id: number;
    year: number;
    type: number;
    course: number;
    count: number;
}

export interface OrgInternship {
    id: number;
    year: number;
    type: number;
    course: number;
    count: number;
}

export interface OrgLaboratory {
    id: number;
    year: number;
    count: number;
}

export interface OrgDetailResponse {
    id: number;
    tin: string;
    name: string;
    short_name: string;
    ownership_type: OwnershipType;
    academic_type: AcademicType;
    oked: string;
    opf: string;
    kfs: string;
    soogu: string;
    status: number;
    created_at: string;
    updated_at: string;
    director: OrgDirector | null;
    addresses: OrgAddress[];
    founders: OrgFounder[];
    academic_mobility: OrgAcademicMobility[];
    doctorate: OrgDoctorate[];
    internships: OrgInternship[];
    laboratories: OrgLaboratory[];
}
