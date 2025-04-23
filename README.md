# Data Gen Hub FE

**Data Gen Hub FE** is a modern web application for managing classes, users, roles/permissions, file storage (theses, documents), and provides a comprehensive dashboard for educational institutions and universities. The UI is modern, user-friendly, and supports multiple roles (Admin, Lecturer, Student).

## 🚀 Main Features
- User authentication, login, and role-based access control
- Class management: create, edit, view classes, manage student and lecturer lists
- File management: upload/download documents and theses
- Dashboard: progress tracking, results, and interactive visual charts
- Dynamic role & permission management
- Powerful search, filtering, and quick actions on data

## 🛠️ Technologies Used
- **Next.js** (App Router, SSR/CSR)
- **React 19** + TypeScript
- **TailwindCSS** + Radix UI (UI components)
- **React Query** (TanStack Query)
- **Zod** (data validation)
- **Echarts** (visualization)
- **Axios** (API communication)
- **Husky, Lint-staged, Prettier, ESLint** (code quality tools)

## ⚙️ Requirements
- Node.js >= 18
- npm, yarn, pnpm, or bun

## 🔧 Setup & Run
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd data-gen-hub-fe
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or: yarn install | pnpm install | bun install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and update variables as needed (e.g., API endpoint)

4. **Start development server:**
   ```bash
   npm run dev
   # or: yarn dev | pnpm dev | bun dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

6. **Linting & formatting:**
   ```bash
   npm run lint       # Check lint errors
   npm run lint:fix   # Auto-fix lint errors
   npm run format     # Check code formatting
   npm run format:fix # Format code automatically
   ```

## 📁 Main Directory Structure
- `src/app`: Main pages (dashboard, class management, file management, ...)
- `src/components`: Reusable UI components
- `src/context`: State management (auth, ...)
- `src/hooks`: Custom hooks (useUsers, useRoles, ...)
- `src/utils`: Utilities and helpers

## 📝 Notes
- The project is fully written in **TypeScript** and follows strict code standards with ESLint + Prettier.
- Easily extensible for new features.
- For full functionality, a compatible backend API is required.

---
If you encounter any issues during setup or usage, please contact the development team or create a new issue.
