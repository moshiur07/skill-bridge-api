# Skill Bridge - API 🚀

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)](https://stripe.com/)

**Skill Bridge API** is a high-performance, modular backend system designed for a modern tutoring platform. It manages complex workflows including tutor vetting, session scheduling, and secure multi-party payments.

---

## 🌟 Core Modules

- **👤 Users & RBAC**: Advanced role management (Admin, Tutor, Student) with secure session handling via **Better Auth**.
- **👨‍🏫 Tutor Management**: Comprehensive tutor profiles, skill verification, and featured placement logic.
- **📅 Booking System**: Atomic scheduling engine to prevent double-bookings and manage session states.
- **💳 Payment Gateway**: Robust **Stripe** integration supporting checkout flows and asynchronous webhook processing.
- **📁 Media Engine**: Cloud-native image management using **Cloudinary** and **Multer**.
- **📊 Analytics & Reviews**: Data-driven feedback system for session quality and tutor performance.
- **🛡️ Validation**: Strict runtime schema validation using **Zod** for all incoming request payloads.

---

## 🛠️ Technology Stack

- **Runtime**: Node.js (LTS)
- **Framework**: Express.js v5 (Next-gen Express)
- **Database**: PostgreSQL (hosted on Neon DB)
- **ORM**: Prisma (with Type-safe Client generation)
- **Authentication**: Better Auth (with Prisma adapter)
- **Payments**: Stripe API
- **File Storage**: Cloudinary
- **Validation**: Zod
- **Utilities**: http-status, cors, dotenv

---

## 🏗️ Architecture

The API follows a **Domain-Driven Design (DDD)** approach, organized into self-contained modules:

```text
src/
├── app/
│   ├── modules/        # Domain Modules
│   │   ├── admin/      # System administration
│   │   ├── bookings/   # Scheduling & session logic
│   │   ├── categories/ # Skill categorization
│   │   ├── payment/    # Stripe integration
│   │   ├── reviews/    # Feedback & ratings
│   │   ├── tutor/      # Tutor profiles & availability
│   │   └── users/      # Identity management
│   ├── middleware/     # Global & route-specific security
│   └── routes/         # Unified route registry
├── config/             # External service configurations
├── interfaces/         # Shared TypeScript interfaces
└── server.ts           # Server entry point
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **PostgreSQL** instance
- **Stripe** API Keys
- **Cloudinary** API Keys

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   ```bash
   # Sync schema with database
   npm run migrate
   
   # Generate Prisma client
   npm run generate
   ```

3. **Seeding Data** (Optional):
   ```bash
   npm run seed:category
   npm run seed:admin
   ```

4. **Environment Configuration**:
   Create a `.env` file with your credentials (see `.env.example`).

5. **Start Server**:
   ```bash
   npm run dev
   ```

---

## 📜 Available Scripts

- `npm run dev`: Start development server with `tsx` watch mode.
- `npm run build`: Build the project for production.
- `npm run start`: Run the compiled production server.
- `npm run migrate`: Execute Prisma migrations.
- `npm run studio`: Open Prisma Studio to manage data visually.
- `npm run stripe:webhook`: Proxy Stripe webhooks to your local environment.

---

## 🛡️ Security
- **Type Safety**: 100% TypeScript coverage for end-to-end type safety.
- **Validation**: Zod schemas for every endpoint.
- **Auth**: Production-ready sessions with CSRF protection.

---

## 👤 Author
**Moshiur Rahman**
- GitHub: [@moshiur07](https://github.com/moshiur07)
- Website: [moshiur.dev](https://moshiur-rahman-dev.netlify.app/)

---
*Powering the future of skill exchange.*
