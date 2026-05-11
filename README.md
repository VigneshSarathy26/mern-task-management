# Protocol: MERN Microservices Task Management Platform

A production-ready, high-performance task management engine built with a microservices architecture.

## 🚀 Architecture Overview

| Layer | Technologies | Key Optimizations |
| :--- | :--- | :--- |
| **Frontend** | React 18, Tailwind CSS, Framer Motion | "Identity Protocol" Aesthetics, Micro-animations |
| **Edge & Proxy** | Nginx | Gzip, strict CSP/XSS headers, static asset caching |
| **Microservices** | Node.js, Express | Fully path-stripped API Gateway integration |
| **Database** | MongoDB (Mongoose) | Compound Indexes, Virtuals, TTL auto-pruning |
| **Caching** | Redis (ioredis) | Cache-Aside pattern for expensive analytics |
| **DevOps** | Docker, Ansible | Containerized environments, Infrastructure as Code |

## 📂 Project Structure

```text
task-management-platform/
├── apps/
│   └── web/                         # React frontend (Vite)
├── services/
│   ├── api-gateway/                 # Edge routing & Auth verification
│   ├── auth-service/                # Login, JWT, User Management
│   ├── task-service/                # Task CRUD & Analytics (Redis cached)
│   └── ...                          # Extensible for collab, notifications, etc.
├── packages/                        # Shared Internal Libraries
│   ├── logger/                      # Pino configuration
│   ├── database/                    # Mongoose connection helpers
│   ├── redis/                       # Ioredis helpers
│   ├── errors/                      # Standard error classes
│   └── ...
└── infrastructure/                  # Deployment & Automation
    ├── docker/                      # Multi-stage Dockerfiles
    └── ansible/                     # Deployment playbooks
```

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18
- Docker & Docker Compose

### Installation
1. Clone the repository
2. Run `npm install` at the root to setup workspaces
3. Copy `.env.example` to `.env` in each service

### Development
Launch the entire stack using Docker Compose:
```bash
npm run dev
```
The application will be available at:
- Frontend: `http://localhost:3000`
- API Gateway: `http://localhost:4000`

## 🔐 Security Features
- **Strict CSP**: Headers configured in Nginx to prevent XSS.
- **Path Stripping**: Internal service routes are hidden behind the Gateway.
- **JWT Authentication**: Secure identity propagation across services.

## 📈 Performance
- **Sub-millisecond Caching**: Redis Cache-Aside for heavy aggregation queries.
- **DB Optimization**: Compound indexes for O(1) lookups on common filters.
- **Gzip**: Edge-level compression for faster asset delivery.