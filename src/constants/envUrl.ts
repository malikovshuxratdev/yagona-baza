/**
 * Environment variables configuration
 */

export const SCIENCEID_URL = import.meta.env.VITE_SCIENCEID_URL;
export const REESTR_URL = import.meta.env.VITE_REESTR_URL;
export const INTERNSHIP_URL = import.meta.env.VITE_INTERNSHIP_URL;
export const AKADEM_URL = import.meta.env.VITE_AKADEM_URL;
export const FILE_URL = "";

/** Internship API Basic Auth (o'zgarmas keylar) */
export const INTERNSHIP_BASIC_AUTH_USERNAME = '52722962-6d1a-40b5-955d-06ed886392d9';
export const INTERNSHIP_BASIC_AUTH_PASSWORD = 'hZItlvkz0tD8-Q9i1xecXAu0ZG7LfRQcTA3t3gJJXbE6DfZ-0I6zH-YLKp21RfrmrWsQS37EX8kjLVitOQaS8Q';

/** Akadem API Basic Auth (env orqali) */
export const AKADEM_BASIC_AUTH_USERNAME = String(
    import.meta.env.VITE_AKADEM_BASIC_AUTH_USERNAME ?? ''
).trim();
export const AKADEM_BASIC_AUTH_PASSWORD = String(
    import.meta.env.VITE_AKADEM_BASIC_AUTH_PASSWORD ?? ''
).trim();