# Money Manager

A full-stack web application for personal finance management that helps users track their income and expenses, visualize spending patterns, and manage their financial goals.

## Features

### Core Functionality
- **User Authentication & Authorization**: Secure signup/login with JWT-based authentication and email activation
- **Income Tracking**: Add, view, and manage income sources with categorization
- **Expense Tracking**: Track daily expenses with detailed categorization
- **Category Management**: Create custom categories for both income and expenses with icons
- **Interactive Dashboard**: Real-time financial overview with charts and recent transactions
- **Advanced Filtering**: Filter transactions by date range, amount, category, and keywords
- **Data Export**: Download income/expense reports as Excel files
- **Email Reports**: Automated daily expense summaries and reminder notifications
- **Visual Analytics**: Interactive charts using Recharts for financial insights

### Key Highlights
- Responsive design optimized for mobile and desktop
- Real-time data synchronization
- Secure password encryption with BCrypt
- Scheduled email notifications for daily expense summaries
- Profile photo upload with Cloudinary integration
- Clean and intuitive user interface

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.5.3
- **Language**: Java 21
- **Database**: MySQL (Development) / PostgreSQL (Production)
- **Authentication**: Spring Security with JWT
- **Email Service**: Spring Mail with Brevo SMTP
- **Excel Generation**: Apache POI
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 6.0
- **Styling**: Tailwind CSS 4.1
- **Routing**: React Router DOM 7.6
- **Charts**: Recharts 3.0
- **HTTP Client**: Axios 1.10
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Emoji Picker**: Emoji Picker React

## Prerequisites

Before running this application, ensure you have the following installed:

- **Java Development Kit (JDK)**: Version 21 or higher
- **Node.js**: Version 18 or higher
- **MySQL**: Version 8.0 or higher (for development)
- **Maven**: Version 3.8 or higher
- **Git**: Latest version

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd money-manager
```

### 2. Backend Setup

#### 2.1 Database Configuration

**For MySQL (Development):**

1. Create a new database:
```sql
CREATE DATABASE moneymanager;
```

2. Create a database user (optional but recommended):
```sql
CREATE USER 'moneymanager_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON moneymanager.* TO 'moneymanager_user'@'localhost';
FLUSH PRIVILEGES;
```

**For PostgreSQL (Production):**
Update the `application-prod.properties` file with your database credentials.

#### 2.2 Environment Variables

Create a `.env` file in the `moneymanager-backend` directory or set the following environment variables:

```properties
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
BREVO_USERNAME=your_brevo_smtp_username
BREVO_PASSWORD=your_brevo_smtp_password
MAIL_FROM=your_email@example.com
JWT_SECRET=your_jwt_secret_key_minimum_256_bits
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8080/api/v1.0
```

**Important Notes:**
- **JWT_SECRET**: Should be a strong, randomly generated string (minimum 256 bits for HS256)
- **Brevo**: Sign up at [Brevo](https://www.brevo.com/) for SMTP credentials
- **FRONTEND_URL**: URL where your frontend is running
- **BACKEND_URL**: URL where your backend API is accessible

#### 2.3 Build and Run Backend

```bash
cd moneymanager-backend

# Using Maven Wrapper (recommended)
./mvnw clean install
./mvnw spring-boot:run

# OR using Maven directly
mvn clean install
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### 3. Frontend Setup

#### 3.1 Install Dependencies

```bash
cd moneymanager-frontend
npm install
```

#### 3.2 Environment Variables

Create a `.env` file in the `moneymanager-frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1.0
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

**Cloudinary Setup:**
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name from the dashboard
3. Create an upload preset named `money_manager_upload` (unsigned)

#### 3.3 Run Frontend

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Application Usage

### First Time Setup

1. **Register Account**:
   - Navigate to `http://localhost:5173/signup`
   - Fill in your details and upload a profile photo (optional)
   - Click "Sign Up"

2. **Activate Account**:
   - Check your email for the activation link
   - Click the activation link to activate your account

3. **Login**:
   - Navigate to `http://localhost:5173/login`
   - Enter your credentials and login

### Managing Finances

1. **Create Categories**:
   - Go to Categories page
   - Click "Add Category"
   - Enter category name, select type (income/expense), and choose an icon

2. **Add Income**:
   - Navigate to Income page
   - Click "Add Income"
   - Fill in the details (name, category, amount, date)
   - Submit the form

3. **Add Expenses**:
   - Navigate to Expense page
   - Click "Add Expense"
   - Fill in the details (name, category, amount, date)
   - Submit the form

4. **View Dashboard**:
   - The dashboard shows:
     - Total balance, income, and expenses
     - Recent transactions
     - Financial overview chart
     - Recent income and expense lists

5. **Filter Transactions**:
   - Go to Filters page
   - Set date range, keyword, and sorting preferences
   - Click search to filter transactions

6. **Export Data**:
   - On Income/Expense pages, click "Download" to export as Excel
   - Click "Email" to receive the report via email

## API Endpoints

### Authentication
- `POST /api/v1.0/register` - Register new user
- `GET /api/v1.0/activate?token=<token>` - Activate account
- `POST /api/v1.0/login` - User login
- `GET /api/v1.0/profile` - Get user profile (Protected)

### Categories
- `GET /api/v1.0/categories` - Get all categories (Protected)
- `GET /api/v1.0/categories/{type}` - Get categories by type (Protected)
- `POST /api/v1.0/categories` - Create category (Protected)
- `PUT /api/v1.0/categories/{id}` - Update category (Protected)

### Income
- `GET /api/v1.0/incomes` - Get current month incomes (Protected)
- `POST /api/v1.0/incomes` - Add income (Protected)
- `DELETE /api/v1.0/incomes/{id}` - Delete income (Protected)

### Expenses
- `GET /api/v1.0/expenses` - Get current month expenses (Protected)
- `POST /api/v1.0/expenses` - Add expense (Protected)
- `DELETE /api/v1.0/expenses/{id}` - Delete expense (Protected)

### Dashboard
- `GET /api/v1.0/dashboard` - Get dashboard data (Protected)

### Filters
- `POST /api/v1.0/filter` - Filter transactions (Protected)

### Reports
- `GET /api/v1.0/excel/download/income` - Download income Excel (Protected)
- `GET /api/v1.0/excel/download/expense` - Download expense Excel (Protected)
- `GET /api/v1.0/email/income-excel` - Email income report (Protected)
- `GET /api/v1.0/email/expense-excel` - Email expense report (Protected)

## Project Structure

```
money-manager/
├── moneymanager-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/palak/moneymanager/
│   │   │   │   ├── config/          # Security and app configuration
│   │   │   │   ├── controller/      # REST API controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── entity/          # JPA entities
│   │   │   │   ├── repository/      # Database repositories
│   │   │   │   ├── security/        # JWT and security filters
│   │   │   │   ├── service/         # Business logic
│   │   │   │   └── util/            # Utility classes
│   │   │   └── resources/
│   │   │       └── application.properties
│   ├── pom.xml
│   └── README.md
│
├── moneymanager-frontend/
│   ├── src/
│   │   ├── assets/          # Images and static files
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # React Context API
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── util/            # Utility functions and configs
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

## Scheduled Jobs

The application includes automated scheduled jobs:

1. **Daily Reminder** (10:00 PM IST):
   - Sends email reminder to add income/expenses

2. **Daily Expense Summary** (11:00 PM IST):
   - Sends detailed expense summary for the day

## Security Features

- Password encryption using BCrypt
- JWT-based stateless authentication
- CORS configuration for secure cross-origin requests
- Protected API endpoints with role-based access
- Secure email activation workflow
- Input validation and sanitization

## Troubleshooting

### Backend Issues

**Database Connection Error:**
- Verify MySQL/PostgreSQL is running
- Check database credentials in environment variables
- Ensure database exists

**Email Not Sending:**
- Verify Brevo SMTP credentials
- Check email configuration in `application.properties`
- Ensure firewall allows SMTP connections

**JWT Token Error:**
- Ensure JWT_SECRET is at least 256 bits
- Check token expiration settings
- Clear browser localStorage and login again

### Frontend Issues

**API Connection Error:**
- Verify backend is running on correct port
- Check `VITE_API_BASE_URL` in `.env` file
- Check browser console for CORS errors

**Image Upload Failed:**
- Verify Cloudinary credentials
- Ensure upload preset is set to "unsigned"
- Check network connection

## Production Deployment

### Backend Deployment

1. Update `application-prod.properties` with production database credentials
2. Set `spring.profiles.active=prod` in `application.properties`
3. Build the JAR file:
   ```bash
   ./mvnw clean package -DskipTests
   ```
4. Run the JAR:
   ```bash
   java -jar target/moneymanager-0.0.1-SNAPSHOT.jar
   ```

### Frontend Deployment

1. Update `.env` with production API URL
2. Build the production bundle:
   ```bash
   npm run build
   ```
3. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)


## Acknowledgments

- Spring Boot for the robust backend framework
- React for the dynamic frontend library
- Tailwind CSS for the elegant styling
- Recharts for beautiful data visualization
- All open-source contributors

---

Built with ❤️ for better financial management
