# Yagona Baza

React 18 + TypeScript + Vite asosida qurilgan multi-API admin dashboard. Har bir xizmat (Science ID, Reestr, Internship, Academic, Level, Project, Arxiv, Organization) o'zining alohida `BaseClient` instansiga ega.

## Texnologiyalar

- **React 18**, TypeScript 5, Vite
- **Routing**: React Router v7
- **Server state**: `@tanstack/react-query` v5 — faqat `@/hooks/useQuery` orqali ishlatiladi
- **Client state**: Redux Toolkit
- **Formlar**: React Hook Form + Zod
- **UI**: Ant Design + Radix UI (Shadcn pattern) + Tailwind CSS
- **HTTP**: `BaseClient` singleton (`src/api/baseClient.ts`) — axios to'g'ridan ishlatilmaydi
- **Toast**: `sonner`
- **Sana**: `moment` (uz-latn locale)

## Papka strukturasi

```
src/
├── api/
│   ├── baseClient.ts        # Singleton HTTP client-lar
│   ├── requests/            # Feature API funksiyalar
│   └── index.ts
├── components/
│   ├── shared/              # Umumiy komponentlar
│   ├── forms/               # Form komponentlar
│   ├── ui/                  # Shadcn UI (Radix asosida)
│   ├── table/               # Jadval komponentlar
│   └── loader/
├── constants/               # Env URL-lar, enum-lar
├── contexts/                # React Context (AuthContext)
├── helpers/                 # Sof utility funksiyalar
├── hooks/                   # Custom hook-lar
├── layout/                  # AdminLayout, HomeLayout
├── lib/validation/          # Zod schema-lar
├── pages/                   # Feature sahifalar (academic, arxiv, ...)
├── routes/                  # Router konfiguratsiya
├── types/                   # TypeScript type-lar (feature bo'yicha)
└── utils/
```

## Muhim qoidalar

### HTTP / API

Axios ni to'g'ridan-to'g'ri import qilma. Faqat `BaseClient` instanslaridan foydalan:

```typescript
// To'g'ri
import { organizationApiClient } from '@/api/baseClient';

// Noto'g'ri
import axios from 'axios';
```

Yangi endpoint — `src/api/requests/` ichidagi tegishli faylga qo'shiladi.

### React Query

`@tanstack/react-query` dan to'g'ridan import qilma:

```typescript
// To'g'ri
import { useQuery, useMutation } from '@/hooks/useQuery';

// Noto'g'ri
import { useQuery } from '@tanstack/react-query';
```

QueryKey format: `['feature-name', params]`  
Feature query-lari: `src/hooks/use{Feature}Query.ts`

### Formlar

`useState` bilan form qilma — React Hook Form + Zod majburiy:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({ name: z.string().min(1) });
type FormData = z.infer<typeof schema>;

const form = useForm<FormData>({ resolver: zodResolver(schema) });
```

Zod schema-lar `src/lib/validation/` da saqlanadi.

### Routing

Path-larni hardcode yozma — `src/routes/path.ts` dagi `paths` konstantasidan ol.  
Yangi sahifalar `lazy()` bilan import qilinishi shart.

### Tailwind ranglari

`tailwind.config.js` dagi custom ranglarni ishlatish kerak. Hardcoded hex (`#537590`) emas, Tailwind klaslari (`text-primary-blue`, `bg-secondary-blue`).

### Komponentlar

```typescript
// To'g'ri — React.FC ishlatma
interface UserCardProps {
    name: string;
}
export function UserCard({ name }: UserCardProps) {
    return <div>{name}</div>;
}
```

- Sahifalar va layoutlar: `default export`
- Shared komponentlar va utility-lar: `named export`
- Bir faylda bir komponent — 200+ qatordan oshirma, bo'l

### Import tartibi

1. React
2. Tashqi kutubxonalar
3. Internal (`@/...`)
4. Relative (`./`, `../`)

### Toast xabarnomalar

```typescript
import { toast } from 'sonner';

toast.success("Ma'lumot saqlandi");
toast.error('Xatolik yuz berdi');
```

### Yangi feature yaratish tartibi

1. `src/types/{feature}-type/` — type-lar
2. `src/api/requests/{feature}Api.ts` — API funksiyalar
3. `src/hooks/use{Feature}Query.ts` — query hook-lar
4. `src/pages/{feature}/` — sahifalar va components/
5. `src/routes/path.ts` — path konstantasi
6. `src/routes/Routes.tsx` — route qo'shish (`lazy` import)

## Nima qilma

- `any` type — `unknown` ishlatish kerak
- `console.log` production kodida
- `useEffect` ichida fetch — React Query ishlatish kerak
- Inline `style={{}}` — Tailwind klaslaridan foydalan
- `React.FC` type
- Sahifa komponent faylini `index.tsx` deb nomlama — aniq nom ber
