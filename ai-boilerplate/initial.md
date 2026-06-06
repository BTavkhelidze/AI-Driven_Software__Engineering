# Initial Bootstrapping Prompt: AI eCommerce System

You are a Principal Full-Stack Engineer.

Build a production-grade eCommerce platform using AI-assisted development.

Follow `.clinerules` strictly.

---

## Tech Stack

Frontend:
- React (Vite)
- TypeScript
- TailwindCSS
- React Router
- React Query
- Framer Motion

Backend:
- Node.js
- Express
- TypeScript
- Prisma
- MySQL
- JWT (HttpOnly cookies)

---

## Architecture Rules

Frontend:
- Feature-based structure

Backend:
- Controller → Service → Repository pattern
- Modular domain design

---

## API Standard

All responses:

{
  "success": boolean,
  "data"?: any,
  "error"?: {
    "message": string,
    "code"?: string
  }
}

No raw responses allowed.

---

## Phase Execution (STRICT)

Work sequentially. Stop after each phase and wait for confirmation.

Do not skip phases.

Do not assume success.

---

## Phase 1: Setup

- Create monorepo (/frontend, /backend)
- Setup Express + TypeScript backend
- Setup Vite React frontend
- Install required dependencies
- Configure path aliases (@/*)
- Add /health endpoint in backend

Provide terminal commands step-by-step.

---

## Phase 2: Database

Create Prisma schema:

- User
- Product
- Order
- OrderItem

Generate:
- migrations
- seed file (10+ products, Unsplash images)

---

## Phase 3: Backend

Implement:

- Auth (JWT HttpOnly cookies)
- Products (search, filter, sort)
- Orders (checkout with transactions)

Use layered architecture strictly.

---

## Phase 4: Frontend

Build:

- Auth UI (animated)
- Product catalog (filter + search)
- Cart system (persistent state)
- Checkout flow (multi-step)
- Profile (order history)

UI must be premium and responsive.

---

## Start

Begin with Phase 1 only.

Wait for confirmation before proceeding.