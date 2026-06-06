# AI-Driven Software Engineering: Premium eCommerce Engine

This repository showcases a generative orchestration framework that utilizes **Cline** and **Claude 3.5 Sonnet** as an autonomous software engineering engine to build and maintain a high-performance eCommerce platform.

## 🚀 Repository Layout Map
- `.clinerules`: Agentic behavior constraints and system instructions parsed automatically by Cline to ensure code consistency.
- `ai-boilerplate/`: Core blueprints, project architecture definitions, and automated generation prompts.
- `docs/`: Audited records of human engineering interventions, architecture decisions, and model interaction logs.
- `src/`: The production codebase generated and managed by the AI engine.

## 🛠 Tech Stack
- **Frontend:** React, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod.
- **Backend:** Node.js, Express, Cookie-Parser, CORS-enabled REST API.
- **State Management:** React Context API + TanStack Query.
- **AI Engine:** Cline (Extension), Claude 3.5 Sonnet (via OpenRouter).

## ⚡ Quickstart Run Strategy

### 1. Prerequisites
- VS Code installed.
- **Cline** extension installed in VS Code.
- API Key from **OpenRouter** (configured for **Claude 3.5 Sonnet**).

### 2. Initialization
1. Open this repository in VS Code.
2. Open the **Cline** panel.
3. Feed the instructions found in `ai-boilerplate/initial.md` directly into the Cline interface to trigger the automated build pipeline.

### 3. Backend Setup
1. Navigate to your backend directory.
2. Run `npm install` to install dependencies (express, cors, cookie-parser, etc.).
3. Ensure your environment variables are configured in a `.env` file (`PORT`, etc.).
4. Start the server: `npm run dev`.

## 🧠 Architectural Overview
The engine leverages autonomous agents to map schema validation directly from Zod to the UI, ensuring end-to-end type safety and rapid feature iteration.



---

## 📝 Engineering Logs
*See the `docs/` folder for a detailed history of the AI-driven development process, including debugging sessions and iterative refinements.*

---
*Built with AI-orchestrated precision.*