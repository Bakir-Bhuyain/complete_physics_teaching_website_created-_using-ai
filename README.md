# SSC Physics — AI-assisted Learning Platform (Frontend)

Short description
A responsive React + Vite frontend for an SSC Physics learning platform (created with AI assistance). This repo holds the client app: authentication, localization (Bangla / English), topic pages, blog, contact, and a dashboard. The frontend expects a backend API — see "Backend contract" below.

Table of contents
- Features
- Technologies
- Quick start
- Environment variables
- Available scripts
- Expected backend contract (high level)
- Project structure
- Contributing / help wanted
- Deployment
- License

Features
- Token-based authentication (login/register) with AuthContext and axios
- Protected routes and a reusable Layout
- Dashboard and Profile pages for logged-in users
- Topic pages for learning content (topic/:id)
- Blog and Contact pages
- Language toggle (Bangla / English) with remote preference patch
- Responsive UI using Tailwind CSS + DaisyUI and custom utilities (mesh background, glass, gradient text)
- Built with Vite for fast dev and optimized builds

Technologies used
- React 18
- Vite
- Tailwind CSS + DaisyUI
- PostCSS + Autoprefixer
- react-router-dom
- axios
- framer-motion
- lucide-react
- clsx, tailwind-merge
- ESLint (dev)

Quick start (local)
1. Clone
   git clone https://github.com/Bakir-Bhuyain/complete_physics_teaching_website_created-_using-ai.git
   cd complete_physics_teaching_website_created-_using-ai
2. Install
   npm install
3. Create env
   Copy .env.example → .env (or add Vite env variables locally)
4. Run dev server
   npm run dev
5. Build for production
   npm run build
   npm run preview

Environment variables (.env / .env.local)
Use Vite-style variables (prefix VITE_). Example in .env.example:
- VITE_API_BASE_URL=http://localhost:5000

Available scripts (package.json)
- npm run dev — start dev server (Vite)
- npm run build — build production bundle
- npm run preview — preview built bundle
- npm run lint — run ESLint

Expected backend contract (high level)
Auth endpoints (used by frontend):
- POST /api/auth/login
  - body: { email, password }
  - response: { token, user }
- POST /api/auth/register
  - body: { name, email, password, ... }
  - response: { token, user }
- GET /api/auth/me
  - header: Authorization: Bearer <token>
  - response: { user }
- PATCH /api/auth/language
  - header: Authorization: Bearer <token>
  - body: { languagePreference: "bangla" | "english" }
  - response: updated user

Other endpoints (expected / recommended)
- GET /api/topics
- GET /api/topics/:id
- GET /api/blogs
- GET /api/blogs/:id
- POST /api/contact (contact form)
Adjust these when backend is available; add exact request/response formats to docs.

Project structure (important files)
- index.html — app entry
- src/main.jsx — React entry
- src/App.jsx — routing and protected/public routes
- src/context/AuthContext.jsx — auth + language toggle + axios defaults
- src/pages/* — Landing, Login, Register, Dashboard, TopicPage, ProfilePage, BlogPage, ContactPage
- src/components/* — reusable components and Layout
- src/index.css — Tailwind + custom utilities
- vite.config.js, tailwind.config.js, postcss.config.js

What to highlight when asking for help
- This repository is the frontend only; contributors should implement or mock the backend matching the contract above.
- Add a .env with VITE_API_BASE_URL pointing to backend.
- The AuthContext automatically sets axios Authorization header from localStorage token — ensure backend returns token as expected.
- Translation/localization: default language is bangla; add translation files or a proper i18n solution.
- Accessibility and UX testing across devices is needed.
- Add tests and GitHub Actions CI for linting/build checks.

Help wanted / suggested tasks
- Implement / provide backend API (or a mock server)
- Add i18n support (e.g., react-i18next) and provide Bangla translations
- Add unit & integration tests, plus CI pipeline
- Improve accessibility (WCAG) and responsiveness
- Add content for topics and blog posts
- Add analytics and error logging (Sentry / similar)

Recommendations (files to add)
- .env.example (provided below)
- CONTRIBUTING.md (provided below)
- LICENSE (MIT) (provided below)
- GitHub issue and PR templates (provided below)

Contact / maintainer
- Repo owner: Bakir-Bhuyain

License
This repository should include a license file. See LICENSE (MIT) provided with these files.
