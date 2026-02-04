// general routes
export const PAGE_NOT_FOUND = '/404';
export const HOME = '/';

// admin routes (science-id section)
export const ADMIN = '/science-id';
export const DASHBOARD = '/science-id/dashboard';

export const USERS = '/science-id/users';
export const USER_DETAIL = '/science-id/users/:id';

// Organization
// export const ORGANIZATIONS = '/organizations';
// export const ORGANIZATION_CREATE = '/organizations/create';
// export const ORGANIZATION_EDIT = '/organizations/edit/:id';
// export const ORGANIZATION_VIEW = '/organizations/view/:tin';
// export const ORGANIZATION_DELETE = '/organizations/delete/:id';

const paths = {
    PAGE_NOT_FOUND,
    HOME,
    ADMIN,
    DASHBOARD,
    USERS,
    USER_DETAIL,

};

export default paths;
