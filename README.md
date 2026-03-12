# 🛒 E-Commerce DevOps Project

A production-grade full-stack e-commerce platform built with microservices architecture, fully containerized and deployed with a complete DevOps pipeline.

[![CI/CD Pipeline](https://github.com/shraddha835/ecommerce-devops-project/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/shraddha835/ecommerce-devops-project/actions/workflows/ci-cd.yml)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
└───────────────────────┬─────────────────────────────────────┘
                        │ :3000 / :80
┌───────────────────────▼─────────────────────────────────────┐
│                   Next.js Frontend                          │
│         (Auth · Products · Cart · Orders · Profile)         │
└───────────┬────────────────────────────┬────────────────────┘
            │ :8081                      │ :8082
┌───────────▼────────────┐  ┌────────────▼───────────────────┐
│     User Service       │  │      Product Service           │
│   (Spring Boot 3.2)    │  │    (Spring Boot 3.2)           │
│  signup · login · JWT  │  │   catalog · search · seed      │
└───────────┬────────────┘  └────────────┬───────────────────┘
            │                            │
┌───────────▼────────────┐  ┌────────────▼───────────────────┐
│      PostgreSQL        │  │          MongoDB               │
│   users · orders       │  │         products               │
└────────────────────────┘  └────────────────────────────────┘
```

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, Tailwind CSS |
| Backend | Spring Boot 3.2, Java 17 |
| Databases | PostgreSQL 16, MongoDB 7 |
| Containerization | Docker, Docker Compose |
| Orchestration | Kubernetes (Docker Desktop / K8s) |
| CI/CD | GitHub Actions |
| Registry | Docker Hub |
| Service Discovery | Eureka Server |

---

## ✨ Features

- **Authentication** — Sign up, login, session management, protected routes
- **Product Catalog** — 30 seeded products with search, category filter, sort
- **Shopping Cart** — Add/remove items, quantity control, persistent state
- **Checkout & Orders** — Place orders (requires login), view order history with item breakdown
- **Profile Page** — User account settings, logout

---

## 🔧 DevOps Pipeline

```
git push → GitHub Actions
               │
               ├── Test Frontend (npm run lint + build)
               ├── Test user-service (Maven)
               ├── Test product-service (Maven)
               ├── Test eureka-server (Maven)
               │
               └── [main branch only]
                       │
                       ├── Build & Push frontend → Docker Hub
                       ├── Build & Push user-service → Docker Hub
                       ├── Build & Push product-service → Docker Hub
                       └── Build & Push eureka-server → Docker Hub
```

---

## 🐳 Run with Docker Compose (Local)

```bash
# Clone the repo
git clone https://github.com/shraddha835/ecommerce-devops-project.git
cd ecommerce-devops-project

# Start all services
docker-compose up -d

# App runs at http://localhost:3000
```

Services started:
| Service | Port |
|---------|------|
| Frontend | 3000 |
| User Service | 8081 |
| Product Service | 8082 |
| PostgreSQL | 5432 |
| MongoDB | 27017 |

---

## ☸️ Deploy to Kubernetes

```bash
# Enable Kubernetes in Docker Desktop, then:
kubectl apply -f devops/kubernetes/namespace.yaml
kubectl apply -f devops/kubernetes/configmap-secret.yaml
kubectl apply -f devops/kubernetes/databases.yaml
kubectl apply -f devops/kubernetes/postgres.yaml
kubectl apply -f devops/kubernetes/eureka-server.yaml
kubectl apply -f devops/kubernetes/user-service.yaml
kubectl apply -f devops/kubernetes/product-service.yaml
kubectl apply -f devops/kubernetes/frontend.yaml

# Check pods
kubectl get pods -n ecommerce

# App runs at http://localhost:80
```

---

## 📦 Docker Hub Images

| Image | Link |
|-------|------|
| Frontend | `shraddha835/frontend:latest` |
| User Service | `shraddha835/user-service:latest` |
| Product Service | `shraddha835/product-service:latest` |
| Eureka Server | `shraddha835/eureka-server:latest` |

---

## 📁 Project Structure

```
ecommerce-devops-project/
├── frontend/                  # Next.js app
│   ├── app/
│   │   ├── products/          # Product listing + search
│   │   ├── cart/              # Shopping cart
│   │   ├── orders/            # Order history
│   │   ├── profile/           # User profile
│   │   ├── login/ signup/     # Auth pages
│   │   ├── components/        # Navbar, ProductCard
│   │   └── lib/               # auth, cart, orderApi, productApi
│   └── Dockerfile
├── backend/
│   ├── user-service/          # Auth + Orders (PostgreSQL)
│   ├── product-service/       # Product catalog (MongoDB)
│   └── eureka-server/         # Service discovery
├── devops/
│   ├── kubernetes/            # K8s manifests
│   ├── monitoring/            # Prometheus + Grafana configs
│   └── logging/               # Logstash config
├── .github/workflows/
│   ├── ci-cd.yml              # Main CI/CD pipeline
│   └── security-scan.yml      # Trivy security scan
└── docker-compose.yml
```

## Architecture

### Frontend
- **Next.js 14** - Server-side rendering, API routes
- **React 18** - Modern UI components
- **Tailwind CSS** - Responsive design

### Backend Microservices (Spring Boot)
- **User Service** (Port: 8081) - Authentication, user profiles, JWT tokens
- **Product Service** (Port: 8082) - Product catalog, search, categories
- **Order Service** (Port: 8083) - Shopping cart, order management
- **Payment Service** (Port: 8084) - Payment gateway integration
- **Inventory Service** (Port: 8085) - Stock management
- **API Gateway** (Port: 8080) - Route requests to microservices
- **Eureka Server** (Port: 8761) - Service discovery

### Technologies
- **Frontend:** Next.js, React, Tailwind CSS, Redux Toolkit
- **Backend:** Spring Boot 3.x, Java 17+
- **Databases:** PostgreSQL, MongoDB, Redis
- **Message Queue:** RabbitMQ
- **API Gateway:** Spring Cloud Gateway
- **Service Discovery:** Eureka Server

## DevOps Stack

- **Containerization:** Docker & Docker Compose
- **Orchestration:** Kubernetes (K8s) with Helm
- **CI/CD:** GitHub Actions
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)
- **Tracing:** Jaeger
- **IaC:** Terraform + Ansible

## Project Structure

```
ecommerce-devops-project/
├── frontend/                 # Next.js application
├── backend/                  # Spring Boot microservices
│   ├── user-service/
│   ├── product-service/
│   ├── order-service/
│   ├── payment-service/
│   ├── inventory-service/
│   ├── api-gateway/
│   └── eureka-server/
├── devops/                   # DevOps configurations
│   ├── docker/
│   ├── kubernetes/
│   ├── ci-cd/
│   ├── monitoring/
│   └── logging/
├── infrastructure/           # IaC files
│   ├── terraform/
│   └── ansible/
└── docs/                     # Documentation
```

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- Docker & Docker Compose
- Kubernetes (minikube or kind)
- Maven 3.8+

### Quick Start

```bash
# Start all services with Docker Compose
docker-compose up -d

# Or deploy to Kubernetes
kubectl apply -f devops/kubernetes/

# Access the application
Frontend: http://localhost:3000
API Gateway: http://localhost:8080
```

## Development

See individual service READMEs for specific setup instructions.

## License
MIT
