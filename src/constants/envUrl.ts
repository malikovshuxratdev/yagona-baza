/**
 * Environment variables configuration
 */

export const SCIENCEID_URL = import.meta.env.VITE_SCIENCEID_URL;

export const SCIENCEID_BASIC_AUTH_USERNAME = String(
    import.meta.env.VITE_SCIENCEID_BASIC_AUTH_USERNAME ?? '',
).trim();
export const SCIENCEID_BASIC_AUTH_PASSWORD = String(
    import.meta.env.VITE_SCIENCEID_BASIC_AUTH_PASSWORD ?? '',
).trim();
export const REESTR_URL = import.meta.env.VITE_REESTR_URL;
export const INTERNSHIP_URL = import.meta.env.VITE_INTERNSHIP_URL;
export const ACADEM_URL = import.meta.env.VITE_AKADEM_URL;
export const LEVEL_URL = import.meta.env.VITE_LEVEL_URL;
export const LEVEL_MONITORING_URL = import.meta.env.VITE_LEVEL_MONITORING_URL;
export const ARXIV_URL = import.meta.env.VITE_ARXIV_URL;
export const PROJECT_URL = import.meta.env.VITE_PROJECT_URL;
export const INDEX_URL = import.meta.env.VITE_INDEX_URL;

export const PROJECT_BASIC_AUTH_USERNAME = String(
    import.meta.env.VITE_PROJECT_BASIC_AUTH_USERNAME ?? '',
).trim();
export const PROJECT_BASIC_AUTH_PASSWORD = String(
    import.meta.env.VITE_PROJECT_BASIC_AUTH_PASSWORD ?? '',
).trim();
export const FILE_URL = '';

/** Internship API Basic Auth (env orqali) */
export const INTERNSHIP_BASIC_AUTH_USERNAME = String(
    import.meta.env.VITE_INTERNSHIP_BASIC_AUTH_USERNAME ?? '',
).trim();
export const INTERNSHIP_BASIC_AUTH_PASSWORD = String(
    import.meta.env.VITE_INTERNSHIP_BASIC_AUTH_PASSWORD ?? '',
).trim();

/** Academ API Basic Auth (env orqali) */
export const ACADEM_BASIC_AUTH_USERNAME = String(
    import.meta.env.VITE_AKADEM_BASIC_AUTH_USERNAME ?? '',
).trim();
export const ACADEM_BASIC_AUTH_PASSWORD = String(
    import.meta.env.VITE_AKADEM_BASIC_AUTH_PASSWORD ?? '',
).trim();
