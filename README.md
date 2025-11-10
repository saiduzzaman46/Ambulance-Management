# MediRide - Smart Ambulance Dispatch System

MediRide is a full-stack web application that helps users book ambulances in emergency situations. Users can select pickup and drop locations, choose ambulance types, view estimated fare and complete payments. Admin can manage ambulances, drivers and paramedics from admin dashboard.

## Features

- User registration & login
- User profile edit with CRUD
- Pick & drop location selection
- Ambulance type selection
- Estimated fare calculation
- Payment dashboard
- Admin dashboard
- Ambulance / Driver / Paramedic CRUD

## Technologies Used

- **Frontend:** Next.js 15.5, React 19, TypeScript, Tailwind CSS
- **Backend:** Express.js, Node.js
- **Database:** Oracle 10g Database
- **Authentication:** JWT
- **API:** REST API
- **Containerization:** Docker, Docker Compose

## Project Structure

```
Ambulance-Management/
├── ambulancemanagement_frontend/    # Next.js frontend
│   ├── app/                         # Next.js app directory
│   ├── components/                  # React components
│   ├── Dockerfile                   # Frontend Docker configuration
│   └── package.json
├── AmbulanceManagement_Backend/     # Express.js backend
│   ├── config/                      # Database configuration
│   ├── controllers/                 # API controllers
│   ├── models/                      # Data models
│   ├── routes/                      # API routes
│   ├── Dockerfile                   # Backend Docker configuration
│   └── app.js
├── docker-compose.yml               # Docker orchestration
└── .env.example                     # Environment variables template
```

## Getting Started

### Prerequisites

- Node.js 20+ (for local development)
- Docker and Docker Compose (for containerized deployment)
- Oracle 10g Database

### Installation

#### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mohammad-Rifat-Khan/Ambulance-Management.git
   cd Ambulance-Management
   ```

2. **Set up environment variables**
   
   **⚠️ IMPORTANT: Never commit `.env` files with real credentials!**
   
   For local development only:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your local Oracle database credentials (this file is gitignored):
   ```env
   DB_USER=your_oracle_username
   DB_PASSWORD=your_oracle_password
   DB_CONNECTION_STRING=localhost:1521/XE
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

5. **View logs**
   ```bash
   docker-compose logs -f
   ```

6. **Stop the application**
   ```bash
   docker-compose down
   ```

#### Option 2: Local Development

**Backend Setup:**
```bash
cd AmbulanceManagement_Backend
npm install
npm start
```

**Frontend Setup:**
```bash
cd ambulancemanagement_frontend
npm install
npm run dev
```

## Docker Configuration

### Frontend Dockerfile
- Multi-stage build with Node.js 20 Alpine
- Optimized standalone output
- Non-root user for security
- Exposes port 3000

### Backend Dockerfile
- Multi-stage build with Node.js 20 Alpine
- Includes Oracle Instant Client for database connectivity
- Non-root user for security
- Exposes port 5000

### Docker Compose
Orchestrates both frontend and backend services with:
- Isolated network for inter-service communication
- Environment variable management
- Automatic service dependency handling
- Health checks and restart policies

## API Endpoints

Base URL: `http://localhost:5000`

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Additional Routes
See `/routes/authRoutes.js` for complete API documentation.

## Database Schema

Project uses Oracle 10g for storing:
- Users
- Bookings
- Ambulances
- Drivers
- Paramedics

## Development

### Frontend
- Framework: Next.js 15.5 with App Router
- Styling: Tailwind CSS 4
- Charts: Recharts
- HTTP Client: Axios
- Alerts: SweetAlert2

### Backend
- Framework: Express.js 5
- Database Driver: oracledb
- Middleware: CORS, Body Parser

## Production Deployment with GitHub Secrets

**⚠️ NEVER commit sensitive credentials to your repository!**

### Setting Up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `DB_USER` | Oracle database username | `admin` |
| `DB_PASSWORD` | Oracle database password | `your_secure_password` |
| `DB_CONNECTION_STRING` | Oracle connection string | `your-db-host:1521/XE` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.yourdomain.com` |

### Using Secrets in Docker Deployment

When deploying with CI/CD (GitHub Actions), use secrets instead of `.env`:

```yaml
# Example GitHub Actions workflow
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy with secrets
        env:
          DB_USER: ${{ secrets.DB_USER }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
          DB_CONNECTION_STRING: ${{ secrets.DB_CONNECTION_STRING }}
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
        run: |
          docker-compose up -d
```

### Docker Compose with Secrets (Production)

For production, pass secrets as environment variables:

```bash
DB_USER=${{ secrets.DB_USER }} \
DB_PASSWORD=${{ secrets.DB_PASSWORD }} \
DB_CONNECTION_STRING=${{ secrets.DB_CONNECTION_STRING }} \
NEXT_PUBLIC_API_URL=${{ secrets.NEXT_PUBLIC_API_URL }} \
docker-compose up -d
```

### Security Best Practices

✅ Use GitHub Secrets for all sensitive data  
✅ Keep `.env` in `.gitignore` (already configured)  
✅ Use `.env.example` as a template (no real values)  
✅ Rotate credentials regularly  
✅ Use different credentials for dev/staging/production  
✅ Enable 2FA on database and cloud accounts  

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Developers

- **Full Stack Developer:** Sohag (Core application development)
- **DevOps/Docker Integration:** Rifat Khan (Docker containerization, CI/CD, GitHub Actions)

## License

ISC

