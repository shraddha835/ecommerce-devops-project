# Frontend Build Script for Windows

Write-Host "Building E-Commerce Frontend..." -ForegroundColor Green

Set-Location frontend

# Install dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    
    # Run linter
    Write-Host "`nRunning linter..." -ForegroundColor Yellow
    npm run lint
    
    # Build
    Write-Host "`nBuilding application..." -ForegroundColor Yellow
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Frontend built successfully!" -ForegroundColor Green
        
        # Build Docker image
        Write-Host "`nBuilding Docker image..." -ForegroundColor Yellow
        docker build -t "ecommerce/frontend:latest" .
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Docker image created successfully!" -ForegroundColor Green
        } else {
            Write-Host "Failed to build Docker image" -ForegroundColor Red
        }
    } else {
        Write-Host "Failed to build frontend" -ForegroundColor Red
    }
} else {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
}

Set-Location ..

Write-Host "`nFrontend build process completed!" -ForegroundColor Green
