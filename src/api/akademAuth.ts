import {
    ACADEM_URL,
    ACADEM_BASIC_AUTH_USERNAME,
    ACADEM_BASIC_AUTH_PASSWORD,
} from '@/constants';

let cachedToken: string | null = null;

/**
 * Academ API: avval /auth/clients/login orqali token olinadi,
 * keyin barcha so'rovlar Authorization: ClientAuth <token> bilan yuboriladi.
 */
export async function ensureAcademToken(): Promise<string> {
    if (cachedToken) return cachedToken;

    const client_id = ACADEM_BASIC_AUTH_USERNAME;
    const client_secret = ACADEM_BASIC_AUTH_PASSWORD;

    if (!client_id || !client_secret) {
        throw new Error('Academ API: client_id yoki client_secret .env da yo\'q');
    }

    const res = await fetch(`${ACADEM_URL}/auth/clients/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id, client_secret }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(
            `Academ API login xato (${res.status}): ${text}`
        );
    }

    const data = (await res.json()) as { token: string };
    if (!data?.token) {
        throw new Error('Academ API: javobda token yo\'q');
    }

    cachedToken = data.token;
    return cachedToken;
}

/** Cache ni tozalash (masalan, 401 dan keyin yangi token olish uchun) */
export function clearAcademToken(): void {
    cachedToken = null;
}
