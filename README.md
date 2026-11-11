# Matoshri Godabai Dhonge College of Nursing, Khambale — website

Next.js (App Router) + React + TypeScript + Tailwind CSS, with a MySQL database (Prisma) for notices and admission enquiries.

## Run on your computer

Needs Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Saving a file updates the page automatically.

Check that the production build works before you push:

```bash
npm run build
```

## Where to change content

| What | File |
|---|---|
| Name, phone, email, address, WhatsApp, courses, approvals, intro text, features, admissions on/off | `config/colleges/mgdcon.ts` |
| Notices (newest 5 show on the home page) | `data/mgdcon/notices.json` |
| Menu, buttons and headings (English / Marathi) | `i18n/en.json`, `i18n/mr.json` |
| Logo and photos | `public/mgdcon/` |
| Section layout | `components/` |
| Pages (About, Courses, …) | `app/(site)/<page-name>/page.tsx` |

Anything not yet confirmed is written as `[TO FILL]`. Never add facts (seats, fees, approval numbers, results) that are not confirmed.

Notice format:

```json
[
  { "date": "2026-11-11", "title": "Admissions open for GNM 2026-27", "titleMr": "GNM 2026-27 प्रवेश सुरू", "link": "" }
]
```

## Deploy on Vercel (free)

1. Push this project to GitHub (`git add .`, `git commit -m "..."`, `git push`).
2. Go to https://vercel.com and **Sign up / Log in with GitHub**.
3. Click **Add New… → Project**, find `matoshri-godabai-dhonge-nursing-collage` and click **Import**.
   Vercel detects Next.js automatically — leave the build settings as they are.
4. Open **Environment Variables** and add: `COLLEGE` = `mgdcon`. (Optional — `mgdcon` is the default.)
5. Click **Deploy**. After about a minute you get a link like `https://<project-name>.vercel.app` to share for review.
6. Every later `git push` to the `main` branch updates the live site automatically.
7. Put the final link in `siteUrl` in `config/colleges/mgdcon.ts`, then push again.

### Custom domain (later)

Project → **Settings → Domains** → add your domain, then copy the DNS records Vercel shows into your domain provider's DNS panel. HTTPS is set up automatically.

## Tech stack

- **Frontend:** React 19 + TypeScript, Next.js 16 (App Router), Tailwind CSS 4.
- **Backend:** Next.js API routes in `app/api` (Node.js, no separate server).
- **Database:** MySQL / MariaDB through **Prisma ORM** (`prisma/schema.prisma`). SQL Server is also supported (see below).
- **Validation:** zod. **Admin login:** password + signed httpOnly cookie (`lib/auth.ts`).

The site also works **without a database**: notices come from `data/mgdcon/notices.json`,
and the enquiry form asks visitors to call the office.

## Backend and database

### What it does

| Feature | Where |
|---|---|
| Admission enquiry form (home page) → saved in `enquiries` table | `components/EnquiryForm.tsx`, `POST /api/enquiries` |
| Latest notices from the `notices` table (falls back to JSON) | `lib/notices.ts`, `GET /api/notices` |
| Admin panel: see enquiries, change status, add / hide / delete notices | `/admin` (not linked from the site) |
| Health check | `GET /api/health` |

### API

| Method | URL | Who |
|---|---|---|
| POST | `/api/enquiries` | public (rate limited, bot trap) |
| GET | `/api/enquiries?status=new` | admin |
| PATCH / DELETE | `/api/enquiries/:id` | admin |
| GET | `/api/notices` | public |
| GET | `/api/notices?all=1` | admin |
| POST | `/api/notices` | admin |
| PATCH / DELETE | `/api/notices/:id` | admin |
| POST | `/api/admin/login`, `/api/admin/logout` | — |
| GET | `/api/health` | public |

### Set up the database on your computer

1. Install MySQL 8 (or MariaDB) and create a database:
   ```sql
   CREATE DATABASE mgdcon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Copy `.env.example` to `.env` and fill in:
   ```
   DATABASE_URL=mysql://root:yourpassword@localhost:3306/mgdcon
   ADMIN_PASSWORD=choose-a-strong-password
   AUTH_SECRET=<64 random characters>
   ```
   Generate AUTH_SECRET with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. Create the tables and copy the sample notices into the database:
   ```bash
   npm run db:deploy
   npm run db:seed
   ```
4. `npm run dev`, then open http://localhost:3000/admin and log in.
5. Optional: `npm run db:studio` opens a table browser for the database.

When you change `prisma/schema.prisma` (new table or column), run `npm run db:migrate` to create a new migration.

### Database in the cloud (for Vercel)

Vercel needs a database it can reach over the internet. Recommended: **TiDB Cloud** (MySQL compatible,
free plan, no installation, works from any computer) — https://tidbcloud.com

Create a cluster, click **Connect**, generate a password, and use the connection string with `?sslaccept=strict` at the end:
`mysql://USER:PASSWORD@HOST:4000/mgdcon?sslaccept=strict`

Then in Vercel → Project → Settings → Environment Variables add
`DATABASE_URL`, `ADMIN_PASSWORD`, `AUTH_SECRET` (and `COLLEGE=mgdcon`), and redeploy.
Run `npm run db:deploy` once from your computer with the cloud `DATABASE_URL` in `.env` to create the tables.

### Using SQL Server instead of MySQL

1. In `prisma/schema.prisma` set `provider = "sqlserver"`.
2. `npm install @prisma/adapter-mssql` and in `lib/db.ts` create the client with `new PrismaMssql(...)` instead of `PrismaMariaDb`.
3. Delete `prisma/migrations` and run `npm run db:migrate` to create SQL Server migrations.
4. `DATABASE_URL=sqlserver://HOST:1433;database=mgdcon;user=sa;password=...;encrypt=true`

An ASP.NET Core Web API can also be used as the backend later: keep the same JSON shapes and point the
functions in `lib/notices.ts` and the form at that API with `fetch`.
