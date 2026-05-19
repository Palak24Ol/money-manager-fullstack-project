# TrackMyMoney 💰

A full-stack personal finance management web app to track income, expenses, visualize spending patterns, and stay on top of your financial goals.

🌐 **Live Demo:** [money-manager-fullstack-project.vercel.app](https://money-manager-fullstack-project.vercel.app)

---

## Features

- **User Authentication** — Secure signup/login with JWT and email activation
- **Income Tracking** — Add, view, and manage income sources with categories
- **Expense Tracking** — Track daily expenses with detailed categorization
- **Category Management** — Create custom categories with emoji icons
- **Interactive Dashboard** — Real-time financial overview with charts and recent transactions
- **Advanced Filtering** — Filter transactions by date, amount, category, and keywords
- **Data Export** — Download income/expense reports as Excel files
- **Email Reports** — Receive reports directly via email
- **Profile Photo Upload** — Cloudinary integration for profile pictures
- **Responsive Design** — Works on both mobile and desktop

---

## Tech Stack

### Backend
- **Framework:** Spring Boot 3.5.3
- **Language:** Java 21
- **Database:** MySQL (Dev) / Aiven MySQL (Prod)
- **Authentication:** Spring Security + JWT
- **Email:** Resend API
- **Excel:** Apache POI
- **Build Tool:** Maven
- **Containerization:** Docker

### Frontend
- **Framework:** React 18.2 + Vite 6.0
- **Styling:** Tailwind CSS 4.1
- **Routing:** React Router DOM 7.6
- **Charts:** Recharts 3.0
- **HTTP Client:** Axios 1.10
- **Notifications:** React Hot Toast
- **Icons:** Lucide React
- **Image Upload:** Cloudinary

---

## Deployment Stack

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render (Docker) |
| Database | Aiven MySQL |
| Email | Resend |
| Image Upload | Cloudinary |

---

## Local Development

### Prerequisites

- Java 21+
- Node.js 18+
- MySQL 8.0+
- Maven 3.8+

### 1. Clone the repo

```bash
git clone https://github.com/Palak24Ol/money-manager-fullstack-project.git
cd money-manager-fullstack-project
```

### 2. Backend Setup

Create a MySQL database:
```sql
CREATE DATABASE moneymanager;
```

Set these environment variables in IntelliJ Run Configuration:
```
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/moneymanager
JWT_SECRET=anylongrandomstring123456789abc
RESEND_API_KEY=your_resend_api_key
MAIL_FROM=onboarding@resend.dev
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8080
```

Run the backend:
```bash
cd moneymanager-backend
./mvnw spring-boot:run
```

Backend starts at `http://localhost:8080`

### 3. Frontend Setup

```bash
cd moneymanager-frontend
npm install
```

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1.0
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

Run the frontend:
```bash
npm run dev
```

Frontend starts at `http://localhost:5173`

---

## Production Deployment Guide

### Database → Aiven (Free MySQL)
1. Go to [aiven.io](https://aiven.io) → New Service → MySQL
2. Copy host, port, user, password from Connection Information

### Backend → Render (Docker)
1. Push repo to GitHub
2. New Web Service → Docker → Root Directory: `moneymanager-backend`
3. Add environment variables:

```
SPRING_DATASOURCE_URL=jdbc:mysql://<aiven-host>:<port>/defaultdb?ssl-mode=REQUIRED
DB_USERNAME=avnadmin
DB_PASSWORD=your_aiven_password
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
MAIL_FROM=onboarding@resend.dev
FRONTEND_URL=https://your-app.vercel.app
BACKEND_URL=https://your-app.onrender.com
```

### Frontend → Vercel
1. New Project → Import GitHub repo
2. Root Directory: `moneymanager-frontend`
3. Add environment variables:

```
VITE_API_BASE_URL=https://your-backend.onrender.com/api/v1.0
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1.0/register` | Register new user |
| GET | `/api/v1.0/activate?token=<token>` | Activate account |
| POST | `/api/v1.0/login` | User login |
| GET | `/api/v1.0/profile` | Get user profile (Protected) |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1.0/categories` | Get all categories |
| GET | `/api/v1.0/categories/{type}` | Get by type |
| POST | `/api/v1.0/categories` | Create category |
| PUT | `/api/v1.0/categories/{id}` | Update category |

### Income
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1.0/incomes` | Get current month incomes |
| POST | `/api/v1.0/incomes` | Add income |
| DELETE | `/api/v1.0/incomes/{id}` | Delete income |

### Expenses
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1.0/expenses` | Get current month expenses |
| POST | `/api/v1.0/expenses` | Add expense |
| DELETE | `/api/v1.0/expenses/{id}` | Delete expense |

### Reports
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1.0/excel/download/income` | Download income Excel |
| GET | `/api/v1.0/excel/download/expense` | Download expense Excel |
| GET | `/api/v1.0/email/income-excel` | Email income report |
| GET | `/api/v1.0/email/expense-excel` | Email expense report |

---

## Project Structure

```
money-manager-fullstack-project/
├── moneymanager-backend/
│   ├── src/main/java/com/palak/moneymanager/
│   │   ├── config/          # Security & CORS config
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Database repositories
│   │   ├── security/        # JWT filter
│   │   ├── service/         # Business logic
│   │   └── util/            # JWT utility
│   ├── Dockerfile
│   └── pom.xml
│
└── moneymanager-frontend/
    ├── src/
    │   ├── assets/          # Images & static files
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   └── util/            # API config
    ├── index.html
    └── package.json
```

---

## Scheduled Jobs

- **Daily Reminder** (10:00 PM IST) — Email reminder to log transactions
- **Daily Summary** (11:00 PM IST) — Detailed expense summary for the day

---

## Troubleshooting

**Registration fails:** Account is saved but email may fail silently — manually activate via SQL:
```sql
UPDATE defaultdb.tbl_profiles SET is_active = 1 WHERE email = 'your@email.com';
```

**Slow first load:** Render free tier sleeps after 15 mins of inactivity — first request takes 1-2 minutes to wake up.

**CORS error:** Make sure `FRONTEND_URL` in Render env vars matches your exact Vercel URL.

---

## Acknowledgments

- Spring Boot, React, Tailwind CSS, Recharts
- Aiven, Render, Vercel for free hosting
- Resend for free email API
- Cloudinary for image hosting

---

Built with ❤️ by Palak Jaiswal