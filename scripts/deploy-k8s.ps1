# Deploy to Kubernetes Script

Write-Host "Deploying E-Commerce Platform to Kubernetes..." -ForegroundColor Green

# Check if kubectl is available
$kubectlCheck = Get-Command kubectl -ErrorAction SilentlyContinue
if (-not $kubectlCheck) {
    Write-Host "kubectl is not installed. Please install kubectl first." -ForegroundColor Red
    exit 1
}

# Create namespace
Write-Host "`nCreating namespace..." -ForegroundColor Yellow
kubectl apply -f devops/kubernetes/namespace.yaml

# Apply configurations
Write-Host "`nApplying ConfigMaps and Secrets..." -ForegroundColor Yellow
kubectl apply -f devops/kubernetes/configmap-secret.yaml

# Deploy databases
Write-Host "`nDeploying databases..." -ForegroundColor Yellow
kubectl apply -f devops/kubernetes/databases.yaml

# Wait for databases to be ready
Write-Host "`nWaiting for databases to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Deploy Eureka Server
Write-Host "`nDeploying Eureka Server..." -ForegroundColor Yellow
kubectl apply -f devops/kubernetes/eureka-server.yaml

# Wait for Eureka to be ready
Write-Host "`nWaiting for Eureka Server to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Deploy microservices
Write-Host "`nDeploying User Service..." -ForegroundColor Yellow
kubectl apply -f devops/kubernetes/user-service.yaml

Write-Host "`nDeploying Product Service..." -ForegroundColor Yellow
kubectl apply -f devops/kubernetes/product-service.yaml

# Deploy frontend
Write-Host "`nDeploying Frontend..." -ForegroundColor Yellow
kubectl apply -f devops/kubernetes/frontend.yaml

# Check deployment status
Write-Host "`nChecking deployment status..." -ForegroundColor Yellow
kubectl get pods -n ecommerce

Write-Host "`nDeployment completed!" -ForegroundColor Green
Write-Host "`nTo access the services, use port-forwarding:" -ForegroundColor Cyan
Write-Host "kubectl port-forward -n ecommerce svc/frontend 3000:80" -ForegroundColor Cyan
Write-Host "kubectl port-forward -n ecommerce svc/eureka-server 8761:8761" -ForegroundColor Cyan
