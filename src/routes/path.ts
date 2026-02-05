// general routes
export const PAGE_NOT_FOUND = '/404';
export const HOME = '/';

// admin routes (science-id section)
export const ADMIN = '/science-id';
export const DASHBOARD = '/science-id/dashboard';

export const USERS = '/science-id/users';
export const USER_DETAIL = '/science-id/users/:id';

// reestr section
export const REESTR_ADMIN = '/reestr';
export const REESTR_DASHBOARD = '/reestr/dashboard';
export const REESTR_ORGANIZATIONS = '/reestr/organizations';
export const REESTR_ORGANIZATION_VIEW = '/reestr/organizations/view/:id';

const paths = {
    PAGE_NOT_FOUND,
    HOME,
    ADMIN,
    DASHBOARD,
    USERS,
    USER_DETAIL,
    REESTR_ADMIN,
    REESTR_DASHBOARD,
    REESTR_ORGANIZATIONS,
    REESTR_ORGANIZATION_VIEW,
};

export default paths;
