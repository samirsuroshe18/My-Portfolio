# My Portfolio

Personal portfolio of Samir Suroshe, built as a full-stack MERN application. The public site is rendered from content stored in MongoDB, and a password-protected admin dashboard lets that content be edited without touching the code.

**Live site:** https://samirsuroshe.vercel.app/

## Features

**Public site**

- Single-page layout with Hero, About, Skills, Experience, Education, Projects, Open Source, Hackathons, Blogs, GitHub Activity and Contact sections
- Project detail pages at `/projects/:id`, addressable by ID or slug
- Project filtering by category
- GitHub contribution graph
- Contact form that stores messages and optionally sends an email notification
- Light and dark themes
- Responsive layout

**Admin dashboard** (`/admin`)

- JWT-based login with role checks (`admin`, `superadmin`)
- Create, edit, delete and reorder entries for projects, skills, skill categories, experience, education, open source contributions, hackathons, blogs and social links
- Profile, site settings and GitHub configuration editors
- Inbox for contact form messages

**API**

- REST API with separate public and admin routers
- Request validation with Zod
- Rate limiting on login and contact endpoints
- Security headers via Helmet, configurable CORS origin
- Centralised error handling and consistent response envelopes

## Tech Stack

| Layer    | Technologies                                                  |
| -------- | ------------------------------------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS 4, React Router 7, Axios          |
| Backend  | Node.js, Express, Mongoose, Zod, JSON Web Tokens, Nodemailer   |
| Database | MongoDB                                                       |
| Hosting  | Vercel (client and API deployed as separate projects)         |

## Project Structure

```
My-Portfolio/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # sections, cards, layout, ui, admin
│       ├── context/        # auth and theme providers
│       ├── hooks/          # data fetching and form hooks
│       ├── pages/          # public pages and admin pages
│       ├── services/api/   # Axios client and per-resource API modules
│       └── utils/
└── server/                 # Express + MongoDB API
    ├── api/                # serverless entry point for Vercel
    ├── config/             # environment and database setup
    ├── controllers/
    ├── middleware/         # auth, roles, validation, rate limiting, errors
    ├── models/             # Mongoose schemas
    ├── routes/
    ├── seed/               # database seed scripts
    ├── utils/
    └── validators/         # Zod schemas
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- A MongoDB instance, local or hosted (for example MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/samirsuroshe18/My-Portfolio.git
cd My-Portfolio
```

### 2. Set up the server

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and set at least `MONGO_URI` and `JWT_SECRET`. Then seed the database and start the API:

```bash
npm run seed
npm run dev
```

The API runs at `http://localhost:5050`. `GET /health` returns `{ "status": "ok" }` when it is up.

### 3. Set up the client

In a second terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The site runs at `http://localhost:5173`. The admin dashboard is at `http://localhost:5173/admin/login`; sign in with the `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` values from `server/.env`.

## Environment Variables

### Server (`server/.env`)

| Variable                | Description                                          | Value in `.env.example`                 |
| ----------------------- | ---------------------------------------------------- | --------------------------------------- |
| `PORT`                  | Port the API listens on                              | `5050`                                  |
| `NODE_ENV`              | `development`, `production` or `test`                | `development`                           |
| `CORS_ORIGIN`           | Origin allowed to call the API                       | `http://localhost:5173`                 |
| `MONGO_URI`             | MongoDB connection string                            | `mongodb://localhost:27017/portfolio-cms` |
| `JWT_SECRET`            | Secret used to sign auth tokens                      | placeholder, replace it                 |
| `JWT_EXPIRES_IN`        | Token lifetime                                       | `7d`                                    |
| `BCRYPT_SALT_ROUNDS`    | Cost factor for password hashing                     | `10`                                    |
| `EMAIL_HOST`            | SMTP host for contact notifications                  | unset                                   |
| `EMAIL_PORT`            | SMTP port                                            | `587`                                   |
| `EMAIL_USER`            | SMTP username                                        | unset                                   |
| `EMAIL_PASS`            | SMTP password                                        | unset                                   |
| `EMAIL_FROM`            | Sender shown on notification emails                  | see `.env.example`                      |
| `EMAIL_TO`              | Address that receives contact notifications          | `admin@example.com`                     |
| `GITHUB_CHART_BASE_URL` | Base URL for the contribution graph image            | `https://ghchart.rshah.org`             |
| `SEED_ADMIN_NAME`       | Name of the admin user created by the seed script    | `Admin`                                 |
| `SEED_ADMIN_EMAIL`      | Email of the seeded admin user                       | `admin@example.com`                     |
| `SEED_ADMIN_PASSWORD`   | Password of the seeded admin user                    | see `.env.example`                      |

`MONGO_URI` and `JWT_SECRET` are required; the server refuses to start without them. The email settings are optional. Without them, contact form submissions are still saved to the database.

### Client (`client/.env`)

| Variable            | Description          | Value in `.env.example`     |
| ------------------- | -------------------- | --------------------------- |
| `VITE_API_BASE_URL` | Base URL of the API  | `http://localhost:5050/api` |

## Scripts

### Server

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `npm run dev`  | Start the API with automatic reload          |
| `npm start`    | Start the API                                |
| `npm run seed` | Populate the database with initial content   |

The seed script skips collections that already contain data, so it is safe to run more than once. To run a single seeder:

```bash
node seed/runOne.js projects
```

Available names: `admin`, `profile`, `skills`, `experience`, `education`, `projects`, `openSource`, `hackathons`, `siteSettings`, `blogs`, `github`.

### Client

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the Vite dev server           |
| `npm run build`   | Build for production into `dist/`   |
| `npm run preview` | Serve the production build locally  |
| `npm run lint`    | Lint the source with Oxlint         |

## API Overview

All routes are prefixed with `/api`.

**Public**

| Method | Route                | Description                          |
| ------ | -------------------- | ------------------------------------ |
| POST   | `/auth/login`        | Sign in and receive a token          |
| GET    | `/auth/me`           | Current user (requires a token)      |
| GET    | `/profile`           | Profile and social links             |
| GET    | `/skills`            | Skills grouped by category           |
| GET    | `/experience`        | Work experience                      |
| GET    | `/education`         | Education history                    |
| GET    | `/projects`          | Project list                         |
| GET    | `/projects/:id`      | Single project by ID or slug         |
| GET    | `/open-source`       | Open source contributions            |
| GET    | `/hackathons`        | Hackathon achievements               |
| GET    | `/blogs`             | Blog posts                           |
| GET    | `/github`            | GitHub profile configuration         |
| GET    | `/site-settings`     | Site-wide settings                   |
| POST   | `/contact`           | Submit a contact message             |

**Admin**

Each content resource above has a matching `/admin/...` router (for example `/admin/projects`) that supports create, update, delete and, where relevant, reorder. These routes require a valid token and the `admin` or `superadmin` role.

## Deployment

The client and the server are deployed to Vercel as two separate projects, each with its own root directory.

- **Client** (`client/`): standard Vite build. `vercel.json` rewrites every path to `index.html` so client-side routes resolve on refresh. Set `VITE_API_BASE_URL` to the deployed API URL.
- **Server** (`server/`): runs as a serverless function from `api/index.js`. `vercel.json` rewrites every path to that function. Set the server environment variables in the Vercel project settings, with `CORS_ORIGIN` pointing at the deployed client.

## License

Released under the [MIT License](LICENSE).

## Contact

Samir Suroshe — [samirsuroshe.vercel.app](https://samirsuroshe.vercel.app/) · [GitHub](https://github.com/samirsuroshe18)
