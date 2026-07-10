# Deployment Script for Personal Bio
# This script builds the project and deploys to GitHub Pages

Write-Host "Starting deployment process..." -ForegroundColor Green

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit"
    Write-Host "Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "Git repository already exists" -ForegroundColor Green
}

# Build the project
Write-Host "Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Build successful!" -ForegroundColor Green

# Check if remote is set
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Write-Host "No git remote found. Please set up your GitHub repository first." -ForegroundColor Yellow
    Write-Host "Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor Cyan
    Write-Host "Then run this script again." -ForegroundColor Cyan
    exit 1
}

# Deploy to GitHub Pages
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Yellow
npm run deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Deployment successful!" -ForegroundColor Green
Write-Host "Your site should be live at: https://YOUR_USERNAME.github.io/YOUR_REPO/" -ForegroundColor Cyan
