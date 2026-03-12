# E-Commerce Platform - DevOps Project

A full-stack e-commerce platform demonstrating microservices architecture, containerization, and DevOps practices.

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
