/**
 * Environment variables configuration
 */

export const SCIENCEID_URL = import.meta.env.VITE_SCIENCEID_URL;
export const REESTR_URL = import.meta.env.VITE_REESTR_URL;
export const INTERNSHIP_URL = import.meta.env.VITE_INTERNSHIP_URL;
export const AKADEM_URL = import.meta.env.VITE_AKADEM_URL;
export const FILE_URL = "";

/** Internship API Basic Auth (env orqali) */
export const INTERNSHIP_BASIC_AUTH_USERNAME = String(
    import.meta.env.VITE_INTERNSHIP_BASIC_AUTH_USERNAME ?? ''
).trim();
export const INTERNSHIP_BASIC_AUTH_PASSWORD = String(
    import.meta.env.VITE_INTERNSHIP_BASIC_AUTH_PASSWORD ?? ''
).trim();

/** Akadem API Basic Auth (env orqali) */
export const AKADEM_BASIC_AUTH_USERNAME = String(
    import.meta.env.VITE_AKADEM_BASIC_AUTH_USERNAME ?? ''
).trim();
export const AKADEM_BASIC_AUTH_PASSWORD = String(
    import.meta.env.VITE_AKADEM_BASIC_AUTH_PASSWORD ?? ''
).trim();