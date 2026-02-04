export enum ContestType {
    THEMATIC = 'Tematik tanlov',
    INITIATOR = 'Tashabbuskor tanlov',
    PURPOSEFUL = 'Maqsadli tanlov',
}

export const getContestTypeLabel = (contestType: string): string => {
    const typeMap: Record<string, string> = {
        'thematic': ContestType.THEMATIC,
        'initiator': ContestType.INITIATOR,
        'purposeful': ContestType.PURPOSEFUL,
    };
    return typeMap[contestType?.toLowerCase()] || contestType || '-';
};

export enum ProjectType {
    INNOVATION = 'Innovatsion loyiha',
    PRACTICAL = 'Amaliy loyiha',
    FUNDAMENTAL = 'Asosiy loyiha',
}

export const getProjectTypeLabel = (projectType: string): string => {
    const typeMap: Record<string, string> = {
        'innovation': ProjectType.INNOVATION,
        'practical': ProjectType.PRACTICAL,
        'fundamental': ProjectType.FUNDAMENTAL,
    };
    return typeMap[projectType?.toLowerCase()] || projectType || '-';
};

export enum TravelType {
    FOREIGN = 'Xorijiy',
    LOCAL = 'Mahalliy',
}

export const getTravelTypeLabel = (travelType: string): string => {
    const typeMap: Record<string, string> = {
        'foreign': TravelType.FOREIGN,
        'local': TravelType.LOCAL,
    };
    return typeMap[travelType?.toLowerCase()] || travelType || '-';
};

export enum CurrencyType {
    USD = 'Dollar',
    EUR = 'Yevro',
    SEK = 'Krona',
    GBP = 'Angliya funt sterling',
    CHF = 'Shveytsariya franki',
    BCA = 'Bazaviy hisoblash miqdori',
}

export const getCurrencyTypeLabel = (currencyType: string): string => {
    const typeMap: Record<string, string> = {
        'usd': CurrencyType.USD,
        'eur': CurrencyType.EUR,
        'sek': CurrencyType.SEK,
        'gbp': CurrencyType.GBP,
        'chf': CurrencyType.CHF,
        'bca': CurrencyType.BCA,
    };
    return typeMap[currencyType?.toLowerCase()] || currencyType || '-';
};

export enum PositionType {
    PROJECT_LEADER = "Loyiha rahbari",
    PROJECT_CO_LEADER = "Loyiha hamrahbari",
    CHIEF_RESEARCHER = "Bosh ilmiy xodim",
    LEADING_RESEARCHER = "Yetakchi ilmiy xodim",
    SENIOR_RESEARCHER = "Katta ilmiy xodim",
    JUNIOR_RESEARCHER = "Kichik ilmiy xodim",
    TRAINEE_RESEARCHER = "Stajyor tadqiqotchi",
    ENGINEER_HIGHER_EDU = "Muhandis oliy ma'lumotli",
    ENGINEER_SECONDARY_EDU = "Muhandis o'rta ma'lumotli"
}

export const getPositionLabel = (position: string): string => {
    const typeMap: Record<string, string> = {
        'project_leader': PositionType.PROJECT_LEADER,
        'project_co_leader': PositionType.PROJECT_CO_LEADER,
        'chief_researcher': PositionType.CHIEF_RESEARCHER,
        'leading_researcher': PositionType.LEADING_RESEARCHER,
        'senior_researcher': PositionType.SENIOR_RESEARCHER,
        'junior_researcher': PositionType.JUNIOR_RESEARCHER,
        'trainee_researcher': PositionType.TRAINEE_RESEARCHER,
        'engineer_higher_edu': PositionType.ENGINEER_HIGHER_EDU,
        'engineer_secondary_edu': PositionType.ENGINEER_SECONDARY_EDU,
    };
    return typeMap[position?.toLowerCase()] || position || '-';
}