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

// internship section
export const INTERNSHIP_ADMIN = '/internship';
export const INTERNSHIP_DASHBOARD = '/internship/dashboard';
export const INTERNSHIP_APPLICATIONS = '/internship/applications';
export const INTERNSHIP_APPLICATION_VIEW = '/internship/applications/view/:id';

// academic mobility section
export const ACADEMIC_ADMIN = '/academic';
export const ACADEMIC_DASHBOARD = '/academic/dashboard';
export const ACADEMIC_WINNER_PROJECTS = '/academic/winner-projects';

// level (daraja) section
export const LEVEL_ADMIN = '/level';
export const LEVEL_DASHBOARD = '/level/dashboard';

// project (loyiha) section
export const PROJECT_ADMIN = '/project';
export const PROJECT_DASHBOARD = '/project/dashboard';

// arxiv section
export const ARXIV_ADMIN = '/arxiv';
export const ARXIV_DASHBOARD = '/arxiv/dashboard';

// organization (index) section
export const ORG_ADMIN = '/organization';
export const ORG_LIST = '/organization/list';
export const ORG_DETAIL = '/organization/list/view/:id';

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
    INTERNSHIP_ADMIN,
    INTERNSHIP_DASHBOARD,
    INTERNSHIP_APPLICATIONS,
    INTERNSHIP_APPLICATION_VIEW,
    ACADEMIC_ADMIN,
    ACADEMIC_DASHBOARD,
    ACADEMIC_WINNER_PROJECTS,
    LEVEL_ADMIN,
    LEVEL_DASHBOARD,
    PROJECT_ADMIN,
    PROJECT_DASHBOARD,
    ARXIV_ADMIN,
    ARXIV_DASHBOARD,
    ORG_ADMIN,
    ORG_LIST,
    ORG_DETAIL,
};

export default paths;
