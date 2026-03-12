# Backend Build Script for Windows

Write-Host "Building E-Commerce Backend Services..." -ForegroundColor Green

$services = @("eureka-server", "user-service", "product-service")

foreach ($service in $services) {
    Write-Host "`nBuilding $service..." -ForegroundColor Yellow
    Set-Location "backend\$service"
    
    # Clean and package
    mvn clean package -DskipTests
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "$service built successfully!" -ForegroundColor Green
        
        # Build Docker image
        Write-Host "Building Docker image for $service..." -ForegroundColor Yellow
        docker build -t "ecommerce/${service}:latest" .
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Docker image for $service created successfully!" -ForegroundColor Green
        } else {
            Write-Host "Failed to build Docker image for $service" -ForegroundColor Red
        }
    } else {
        Write-Host "Failed to build $service" -ForegroundColor Red
    }
    
    Set-Location ..\..
}

Write-Host "`nAll backend services processed!" -ForegroundColor Green
