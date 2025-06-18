# 🧠 Next.js + TypeScript + Laravel API Monorepo (v1)

A scalable, maintainable, and versioned frontend application using **Next.js (App Router)**, integrated with a **Laravel API backend**, supporting:

* 🌐 Localization (no page refresh)
* 🧩 Modular folder structure with versioning (`v1`)
* 🔒 Secure route middleware
* ⚙️ API service abstraction (Laravel)
* 🧪 Zod validation
* 🎨 Tailwind CSS + shadcn/ui + Lucide icons
* ⚛️ TanStack Query + Table
* ✍️ Alias-based imports
* 🔐 Lucia Auth

---

## 📁 Folder Structure (v1)

```
src/
├── app/
│   ├── [locale]/v1/
│   │   ├── (pages)/                # Route pages (dashboard, login, etc.)
│   │   │   ├── dashboard/
│   │   │   ├── login/
│   │   │   └── ...
│   │   ├── layout.tsx              # v1 layout per locale
│   │   └── page.tsx                # entry page
│   ├── _components/                # Shared UI components
│   ├── _hooks/                     # Custom React hooks
│   ├── _lib/                       # Utilities (e.g., axios.ts, helpers)
│   ├── _middleware/               # Auth and route protection middleware
│   ├── _services/                  # API service layer (Laravel endpoints)
│   ├── _locales/                   # i18n JSON files (en.json, ja.json, etc.)
│   └── layout.tsx                  # Global layout
│
├── public/                         # Static assets (images, favicon, etc.)
├── styles/                         # Tailwind config and globals
│
├── .storybook/                     # Optional Storybook config
├── tests/                          # Testing folder (unit, integration, e2e)
│
├── middleware.ts                   # Next.js middleware for auth & i18n
├── next.config.js                  # Next.js config (incl. i18n + aliases)
├── tsconfig.json                   # TypeScript config with path aliases
├── .env.local                      # Environment variables
└── README.md                       # Project documentation
```

---

## ⚙️ Tech Stack

| Area            | Stack                                                                          |
| --------------- | ------------------------------------------------------------------------------ |
| Frontend        | [Next.js (App Router)](https://nextjs.org/docs/app) + TypeScript               |
| Styling         | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Icons           | [Lucide Icons](https://lucide.dev/)                                            |
| API Fetching    | [TanStack Query](https://tanstack.com/query/v5) + Axios                        |
| Auth            | [Lucia Auth](https://lucia-auth.com/) + Laravel API                            |
| Validation      | [Zod](https://zod.dev/)                                                        |
| Localization    | [next-intl](https://next-intl-docs.vercel.app/) (no page reloads)              |
| Backend         | [Laravel API](https://laravel.com/)                                            |
| Package Manager | [pnpm](https://pnpm.io/)                                                       |
| Tables          | [TanStack Table](https://tanstack.com/table/v8)                                |
| Versioning      | URL-based (`/v1`) route versioning                                             |
| Alias Imports   | TypeScript path aliases (`@components`, `@lib`, etc.)                          |
| Storybook       | (optional) Component-driven dev                                                |

---

## 🚀 Installation

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

---

## 🔐 Auth & Middleware

* **Lucia Auth**: manages sessions, tokens, and user states.
* **middleware.ts**: handles route protection and i18n redirects.
* Easily extendable with role-based guards inside `src/_middleware/`.

---

## 🌍 Localization

* Powered by [`next-intl`](https://next-intl-docs.vercel.app/)
* Supports language prefix in URLs like `/en/v1/dashboard`, `/ja/v1/login`
* No page refresh when changing locale.

---

## 🧪 Validation

Each form or API input uses a Zod schema in its feature folder:

```
src/
└── app/
    └── [locale]/v1/(pages)/login/
        ├── LoginForm.tsx
        ├── schema.ts         ← Zod validation schema
```

---

## 🔁 Import Aliases

Configured in `tsconfig.json`:

```json
"@components/*": ["src/app/_components/*"],
"@lib/*": ["src/app/_lib/*"],
"@services/*": ["src/app/_services/*"]
```

---

## 🔀 Version Control

Routes and logic are separated by version inside:

```
src/app/[locale]/v1/
```

Future versions can live beside it, e.g.:

```
src/app/[locale]/v2/
```

---

## 🧼 To Do

* [ ] Add CI/CD GitHub Actions
* [ ] Add testing setup (Vitest or Playwright)
* [ ] Add dark mode toggle
* [ ] Optimize bundle with custom webpack rules (optional)

---

## 📄 License

MIT — Free to use and modify.
# htain-thein-fe-new
# htain-thein-fe-new
# htain-thein-fe-new
