export interface AkademStatisticsResponse {
    applications: number
    winner_applications: number
    contests: number
    funding_amount: string
}


export interface AkademWinnersResponse {
    page: number
    page_size: number
    previous: any
    next: string
    count: number
    total_pages: number
    results: AkademWinner[]
}

export interface AkademWinner {
    id: number
    scientist: Scientist
    project_name: any
    total_amount: string
    receiver_organization: ReceiverOrganization
    sender_organization: SenderOrganization
}

export interface Scientist {
    science_id: string
    full_name: string
    photo: string
}

export interface ReceiverOrganization {
    id: number
    tin: string
    name: string
    kfs: any
    bank: string
    bank_account?: string
    legal_address: string
    business_address: string
    phone_number: string
    email: string
    region: string
    district: string
    data_json: any
    soato: any
}

export interface SenderOrganization {
    id: number
    tin: string
    name: string
    kfs?: string
    bank?: string
    bank_account?: string
    legal_address: string
    business_address: string
    phone_number: string
    email?: string
    region: string
    district: string
    data_json?: DataJson
    soato?: number
}

export interface DataJson {
    argos: any
    company: Company
    director: Director
    founders: Founder[]
    accountant: Accountant
    companyLink: any
    companyBanks: any[]
    companyContact: any
    companyBranches: any[]
    directorAddress: DirectorAddress
    directorContact: DirectorContact
    companyExtraInfo: CompanyExtraInfo
    accountantAddress: AccountantAddress
    accountantContact: AccountantContact
    companyBillingAddress: CompanyBillingAddress
    companyShippingAddresses: CompanyShippingAddress[]
}

export interface Company {
    kfs: number
    opf: number
    tin: string
    name: string
    oked: string
    soogu: string
    status: number
    taxMode: number
    shortName: string
    taxStatus: any
    vatNumber: any
    businessFund: number
    businessType: number
    taxpayerType: number
    activityTypes: any
    statusUpdated: string
    createdSysDate: string
    suspensionDate: any
    taxModeEndDate: any
    updatedSysDate: string
    liquidationDate: any
    registrationDate: string
    sooguRegistrator: string
    suspensionReason: any
    taxModeBeginDate: any
    businessStructure: number
    liquidationReason: any
    registrationNumber: string
    reregistrationDate: string
    vatRegistrationDate: any
    businessFundCurrency: string
}

export interface Director {
    tin: string
    pinfl: string
    gender: number
    lastName: string
    birthDate: any
    firstName: string
    middleName: string
    citizenship: string
    countryCode: string
    nationality: string
    individualId: any
    passportNumber: string
    passportSeries: string
}

export interface Founder {
    founderLegal: FounderLegal
    founderAddress: any
    founderContact: any
    founderIndividual: any
}

export interface FounderLegal {
    id: any
    kfs: any
    opf: any
    tin: string
    name: string
    oked: any
    soato: any
    soogu: any
    status: any
    created: any
    taxMode: any
    updated: any
    director: any
    stateTin: any
    opfDetail: any
    shortName: any
    vatNumber: any
    accountant: any
    okedDetail: any
    regCountry: number
    sooguDetail: any
    businessFund: any
    businessType: any
    statusDetail: any
    taxpayerType: any
    activityTypes: any
    countryDetail: any
    statusUpdated: any
    founderShareSum: number
    liquidationDate: any
    registrationDate: any
    sooguRegistrator: any
    businessStructure: any
    liquidationReason: any
    countTotalFounders: any
    registrationNumber: any
    reregistrationDate: any
    founderSharePercent: number
    businessStructureDetail: any
}

export interface Accountant {
    tin: string
    pinfl: string
    gender: any
    lastName: string
    birthDate: any
    firstName: string
    middleName: string
    citizenship: any
    countryCode: string
    nationality: any
    individualId: any
    passportNumber: string
    passportSeries: string
}

export interface DirectorAddress {
    flat: any
    house: any
    soato: number
    postcode: any
    sectorCode: number
    streetName: string
    countryCode: number
    villageCode: string
    cadastreNumber: string
}

export interface DirectorContact {
    email: any
    phone: string
}

export interface CompanyExtraInfo {
    avgNumberEmployees: number
    companyExtraInfoId: any
    monthlyNumberEmployees: any
}

export interface AccountantAddress {
    flat: any
    house: any
    soato: number
    postcode: any
    sectorCode: number
    streetName: string
    countryCode: number
    villageCode: string
    cadastreNumber: any
}

export interface AccountantContact {
    email: any
    phone: string
}

export interface CompanyBillingAddress {
    flat: any
    house: any
    soato: number
    postcode: string
    sectorCode: number
    streetName: string
    countryCode: number
    villageCode: string
    cadastreNumber: any
}

export interface CompanyShippingAddress {
    flat: any
    house: any
    soato: number
    postcode: any
    sectorCode: number
    streetName: string
    countryCode: number
    villageCode: string
    cadastreNumber: any
}
