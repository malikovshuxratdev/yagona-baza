import {
    AKADEM_URL,
    AKADEM_BASIC_AUTH_USERNAME,
    AKADEM_BASIC_AUTH_PASSWORD,
} from '@/constants';

let cachedToken: string | null = null;

/**
 * Akadem API: avval /auth/clients/login orqali token olinadi,
 * keyin barcha so'rovlar Authorization: ClientAuth <token> bilan yuboriladi.
 */
export async function ensureAkademToken(): Promise<string> {
    if (cachedToken) return cachedToken;

    const client_id = AKADEM_BASIC_AUTH_USERNAME;
    const client_secret = AKADEM_BASIC_AUTH_PASSWORD;

    if (!client_id || !client_secret) {
        throw new Error('Akadem API: client_id yoki client_secret .env da yo\'q');
    }

    const res = await fetch(`${AKADEM_URL}/auth/clients/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id, client_secret }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(
            `Akadem API login xato (${res.status}): ${text}`
        );
    }

    const data = (await res.json()) as { token: string };
    if (!data?.token) {
        throw new Error('Akadem API: javobda token yo\'q');
    }

    cachedToken = data.token;
    return cachedToken;
}

/** Cache ni tozalash (masalan, 401 dan keyin yangi token olish uchun) */
export function clearAkademToken(): void {
    cachedToken = null;
}
