# Skill Bridge API 🚀

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**Skill Bridge API** is a robust, scalable, and production-ready backend system designed for a modern tutoring and skill-sharing platform. Built with **TypeScript**, **Express.js**, and **Prisma**, it provides a comprehensive suite of features including user management, tutor profiles, scheduling, booking systems, and secure payment processing.

---

## 🌟 Key Features

-   **👤 Advanced User Management**: Role-based access control (RBAC) for Students, Tutors, and Admins.
-   **👨‍🏫 Tutor Ecosystem**: Rich tutor profiles with bios, hourly rates, categories, and featured status.
-   **📅 Smart Scheduling**: Tutors can manage their availability; students can book specific time slots.
-   **💳 Secure Payments**: Integrated with **Stripe** for seamless transaction processing and webhook handling.
-   **🔐 Robust Authentication**: Powered by **Better Auth**, supporting secure sessions and Google OAuth.
-   **📁 Media Management**: Cloud-based image uploads via **Cloudinary** and **Multer**.
-   **⭐ Review System**: Feedback loop where students can rate and review their tutoring sessions.
-   **🛡️ Type Safety**: End-to-end type safety with **TypeScript** and schema validation using **Zod**.
-   **🏗️ Modular Architecture**: Clean, domain-driven structure for easy scalability and maintenance.

---

## 🛠️ Technologies Used

-   **Runtime**: [Node.js](https://nodejs.org/) (LTS)
-   **Framework**: [Express.js](https://expressjs.com/) (v5)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) (Neon DB)
-   **Authentication**: [Better Auth](https://better-auth.com/)
-   **Payment**: [Stripe API](https://stripe.com/docs/api)
-   **File Storage**: [Cloudinary](https://cloudinary.com/)
-   **Validation**: [Zod](https://zod.dev/)

---

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v18 or higher)
-   **npm** or **yarn**
-   **PostgreSQL** instance (or Neon DB account)
-   **Stripe** account (for payments)
-   **Cloudinary** account (for file uploads)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/skill-bridge-api.git
    cd skill-bridge-api
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and populate it with the required variables (see [Environment Variables](#-environment-variables) section).

4.  **Database Migration**:
    ```bash
    npm run migrate
    ```

5.  **Generate Prisma Client**:
    ```bash
    npm run generate
    ```

6.  **Seed Data** (Optional):
    ```bash
    npm run seed:category
    npm run seed:admin
    ```

7.  **Start Development Server**:
    ```bash
    npm run dev
    ```

---

## 🔑 Environment Variables

The following environment variables are required to run the application:

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Secret key for Better Auth |
| `BETTER_AUTH_URL` | Base URL for authentication endpoints |
| `STRIPE_SECRET_KEY` | Stripe Secret API Key |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Signing Secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name |
| `CLOUDINARY_API_KEY` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret |
| `FRONTEND_URL` | URL of the client application |

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── modules/        # Domain-driven modules (User, Tutor, Booking, etc.)
│   │   ├── admin/
│   │   ├── bookings/
│   │   ├── categories/
│   │   ├── payment/
│   │   ├── reviews/
│   │   ├── tutor/
│   │   └── users/
│   ├── middleware/     # Global and route-specific middleware
│   ├── routes/         # Centralized routing logic
│   └── lib/            # External library configurations
├── config/             # Application configuration
├── interfaces/         # Global TypeScript interfaces
├── helper/             # Utility functions
└── server.ts           # Entry point
prisma/                 # Database schema and migrations
scripts/                # Build and maintenance scripts
```

---

## 📜 Available Scripts

-   `npm run dev`: Starts the development server with hot-reload via `tsx`.
-   `npm run build`: Generates Prisma client, compiles TypeScript, and runs build scripts.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Runs ESLint for code quality checks.
-   `npm run migrate`: Executes Prisma migrations.
-   `npm run studio`: Opens Prisma Studio to view/edit database data.
-   `npm run seed:admin`: Seeds the initial admin user.
-   `npm run stripe:webhook`: Proxies Stripe webhooks to the local server.

---

## 🛡️ License

This project is licensed under the [ISC License](LICENSE).

---

## 👤 Author

**Moshiur Rahman**
-   Website: [moshiur.dev](https://moshiur.dev)
-   GitHub: [@moshiur07](https://github.com/moshiur07)

---

*Made with ❤️ for the Skill Bridge Community.*
