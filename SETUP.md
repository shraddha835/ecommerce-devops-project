# E-Commerce DevOps Project - Quick Start Guide

## Prerequisites

Ensure you have the following installed:
- **Docker Desktop** (with Kubernetes enabled)
- **Node.js 18+**
- **Java 17+**
- **Maven 3.8+**
- **kubectl**
- **Git**

## Project Structure Overview

```
ecommerce-devops-project/
├── frontend/                      # Next.js application
├── backend/                       # Spring Boot microservices
│   ├── user-service/             # User authentication & profiles
│   ├── product-service/          # Product catalog
│   ├── order-service/            # (To be implemented)
│   ├── payment-service/          # (To be implemented)
│   ├── inventory-service/        # (To be implemented)
│   ├── api-gateway/              # (To be implemented)
│   └── eureka-server/            # Service discovery
├── devops/                        # DevOps configurations
│   ├── kubernetes/               # K8s manifests
│   ├── monitoring/               # Prometheus, Grafana
│   └── logging/                  # ELK stack configs
└── .github/workflows/            # CI/CD pipelines
```

## Quick Start Options

### Option 1: Local Development (Databases Only)

Start only the databases for local development:

```bash
# Start databases
docker-compose -f docker-compose.dev.yml up -d

# Terminal 1: Start Eureka Server
cd backend/eureka-server
mvn spring-boot:run

# Terminal 2: Start User Service
cd backend/user-service
mvn spring-boot:run

# Terminal 3: Start Product Service
cd backend/product-service
mvn spring-boot:run

# Terminal 4: Start Frontend
cd frontend
npm install
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Eureka Dashboard: http://localhost:8761
- User Service: http://localhost:8081
- Product Service: http://localhost:8082

### Option 2: Full Docker Compose

Run all services in Docker:

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Option 3: Kubernetes Deployment

Deploy to local Kubernetes cluster:

```bash
# Ensure Kubernetes is enabled in Docker Desktop

# Build Docker images
docker build -t ecommerce/frontend:latest ./frontend
docker build -t ecommerce/eureka-server:latest ./backend/eureka-server
docker build -t ecommerce/user-service:latest ./backend/user-service
docker build -t ecommerce/product-service:latest ./backend/product-service

# Deploy to Kubernetes
kubectl apply -f devops/kubernetes/namespace.yaml
kubectl apply -f devops/kubernetes/configmap-secret.yaml
kubectl apply -f devops/kubernetes/databases.yaml
kubectl apply -f devops/kubernetes/eureka-server.yaml
kubectl apply -f devops/kubernetes/user-service.yaml
kubectl apply -f devops/kubernetes/product-service.yaml
kubectl apply -f devops/kubernetes/frontend.yaml

# Check deployment status
kubectl get pods -n ecommerce
kubectl get services -n ecommerce

# Access services
kubectl port-forward -n ecommerce svc/frontend 3000:80
kubectl port-forward -n ecommerce svc/eureka-server 8761:8761
```

## Monitoring & Logging Setup

### Start Monitoring Stack

```bash
cd devops/monitoring
docker-compose -f docker-compose.monitoring.yml up -d
```

**Access:**
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/admin123)
- Kibana: http://localhost:5601
- Jaeger: http://localhost:16686

### Deploy Monitoring to Kubernetes

```bash
kubectl apply -f devops/monitoring/prometheus-k8s.yaml
kubectl apply -f devops/monitoring/grafana-k8s.yaml

# Access Grafana
kubectl port-forward -n ecommerce svc/grafana 3001:80
```

## Development Workflow

### 1. Make Changes to Code

### 2. Test Locally
```bash
# Backend (in service directory)
mvn test
mvn spring-boot:run

# Frontend
npm run lint
npm run build
npm run dev
```

### 3. Build Docker Images
```bash
# Frontend
docker build -t ecommerce/frontend:latest ./frontend

# Backend service
docker build -t ecommerce/user-service:latest ./backend/user-service
```

### 4. Deploy to Kubernetes
```bash
kubectl set image deployment/user-service user-service=ecommerce/user-service:latest -n ecommerce
kubectl rollout status deployment/user-service -n ecommerce
```

## CI/CD Pipeline

The GitHub Actions workflow automatically:
1. **Tests** frontend and backend on every push
2. **Builds** Docker images on main branch
3. **Pushes** images to Docker Hub
4. **Deploys** to Kubernetes cluster

### Setup Secrets in GitHub

Add these secrets to your repository:
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password/token
- `KUBE_CONFIG`: Your Kubernetes config file (base64 encoded)

## Troubleshooting

### Services not starting
```bash
# Check Docker containers
docker-compose ps
docker-compose logs <service-name>

# Check Kubernetes pods
kubectl get pods -n ecommerce
kubectl logs <pod-name> -n ecommerce
kubectl describe pod <pod-name> -n ecommerce
```

### Database connection issues
```bash
# Verify databases are running
docker ps | grep postgres
docker ps | grep mongodb
docker ps | grep redis

# Check connection from service
docker exec -it <container-name> bash
```

### Port already in use
```bash
# Windows: Find and kill process
netstat -ano | findstr :<port>
taskkill /PID <process-id> /F
```

## Next Steps

1. **Implement remaining services:**
   - Order Service
   - Payment Service
   - Inventory Service
   - API Gateway

2. **Add features:**
   - User authentication (JWT)
   - Product CRUD operations
   - Shopping cart functionality
   - Order processing
   - Payment integration

3. **Enhance DevOps:**
   - Add load testing (JMeter/K6)
   - Set up staging environment
   - Implement blue-green deployment
   - Add security scanning (Trivy, SonarQube)
   - Configure auto-scaling policies

4. **Documentation:**
   - API documentation (Swagger/OpenAPI)
   - Architecture diagrams
   - Deployment guides

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Prometheus Documentation](https://prometheus.io/docs/)

## License

MIT
