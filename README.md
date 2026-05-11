# 🌌 Protocol: MERN Task Microservices Platform

A state-of-the-art, containerized task management ecosystem built with a high-performance MERN microservices architecture. Designed for enterprise-grade scalability, observability, and sub-millisecond responsiveness.

![Platform Screenshot](https://raw.githubusercontent.com/VigneshSarathy26/mern-task-management/main/apps/web/public/screenshot.png)

## 🏗️ Architectural Blueprint

The platform follows a **decoupled microservices architecture** where each service is independently deployable and scalable.

### 🧩 Core Services

| Service | Responsibility | Stack |
| :--- | :--- | :--- |
| **API Gateway** | Entry point, path stripping, security headers, request routing. | Node.js, Express, HPM |
| **Auth Service** | Identity management, JWT issuance, password hashing. | Node.js, Express, MongoDB |
| **Task Service** | Core task lifecycle, Kanban state, Redis caching (Cache-Aside). | Node.js, Express, MongoDB, Redis |
| **Collaboration** | Commenting engine, real-time event broadcasting. | Node.js, Express, MongoDB, RabbitMQ |
| **Web App** | Premium React UI, Kanban/List/Calendar views, Framer Motion animations. | React 18, Tailwind CSS, Vite |

---

## ☁️ Cloud Portability

Designed to run anywhere. The infrastructure is abstracted via Docker and ready for cloud-native orchestration:

- **AWS**: EKS (Elastic Kubernetes Service), Fargate, DynamoDB, ElastiCache (Redis).
- **Azure**: AKS (Azure Kubernetes Service), Azure SQL, CosmosDB, Container Apps.
- **GCP**: GKE (Google Kubernetes Engine), Cloud Run, Memorystore, Cloud Spanner.

---

## 🏁 Expected Results

- **Unified Backend**: A single, robust API serving all task orchestration needs via the Gateway.
- **Zero-Downtime**: Kubernetes-ready for rolling updates and self-healing container management.
- **Engineering Excellence**: Codebase passing 100% of quality gates with standardized linting and structure.
- **Efficiency**: Automated deployments via Docker Compose reducing environment setup time by **>90%**.

---

## 🛠️ Getting Started

### Prerequisites
- Docker & Docker Desktop
- Node.js 20+

### Deployment
```powershell
# Clone and start the entire stack
git clone https://github.com/VigneshSarathy26/mern-task-management.git
cd mern-task-management
docker compose -f deploy/compose/docker-compose.dev.yml up -d --build
```

Access the platform at: **[http://localhost](http://localhost)**

---

## 🔍 Troubleshooting & Recovery

| Issue | Potential Cause | Resolution |
| :--- | :--- | :--- |
| **403 Forbidden** | SecurityConfig restrictions | Verify ingress rules in Nginx/Gateway config. |
| **DB Connection Error** | Containers not healthy | Run `docker compose ps` to check service status. |
| **Event Not Received** | RabbitMQ not ready | Check `http://localhost:15672` for queue activity. |
| **Creation Failed** | Validation Errors | Ensure payload matches MongoDB Schema enums (e.g., lowercase priority). |

---

## 🔐 Security Features
- **Strict CSP**: Headers configured in Nginx to prevent XSS and clickjacking.
- **Path Stripping**: Internal service routes (v1 API) are hidden behind the Gateway.
- **JWT Authentication**: Secure identity propagation across the service mesh.
- **CORS Lockdown**: Only authorized origins can communicate with the backend.

---

## 📈 Performance & Scalability
- **Sub-millisecond Caching**: Redis Cache-Aside pattern for heavy task analytics.
- **DB Optimization**: Compound indexes for O(1) lookups on status and creator filters.
- **Gzip/Brotli**: Edge-level compression for faster asset delivery via Nginx.
- **Stateless Design**: All services are stateless, enabling horizontal auto-scaling.

---

## 🚀 Future Roadmap: Next Level Enhancements

To evolve this ecosystem even further, the following modules are planned:

- **🔐 Identity Provider (IDP)**: Integrate Keycloak or Auth0 for OAuth2/OpenID Connect enterprise security.
- **📜 Config Server**: Centralize all environment properties in a separate Git-backed config server.
- **🔀 Advanced Gateway**: Replace Nginx with a more dynamic solution for advanced rate-limiting and A/B testing.
- **📉 Circuit Breakers**: Implement Resilience patterns to handle cascading failures in the microservices chain.
- **🐳 Helm Charts**: Package the Kubernetes manifests into Helm charts for enterprise-grade K8s deployments.