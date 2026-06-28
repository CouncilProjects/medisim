@echo off
:: Exit immediately if a command fails (simulating 'set -e')
setlocal enabledelayedexpansion

:: --- CONFIGURATION ---
set IMAGE_NAME=medisim-app
set CONTAINER_NAME=medisim-app-container

:: Use the first script argument (%1) if provided; otherwise, default to 9966
set TARGET_PORT=%~1
if "%TARGET_PORT%"=="" set TARGET_PORT=9966

set PORT_MAPPING=%TARGET_PORT%:80
:: ---------------------

echo Starting deployment process...
echo Using host port: %TARGET_PORT%

:: 1. Build the Docker image
echo Building Docker image: %IMAGE_NAME%...
docker build -t %IMAGE_NAME% .
if %ERRORLEVEL% neq 0 (
    echo Docker build failed!
    exit /b %ERRORLEVEL%
)

echo Build is Ok

:: 2. Check if an old container exists and remove it
:: We filter for the specific container name and force-remove it if found
docker ps -aq -f name=^/^%CONTAINER_NAME%^$ >nul 2>&1
for /f "tokens=*" %%i in ('docker ps -aq -f name=^/^%CONTAINER_NAME%^$') do (
    echo stop existing container %CONTAINER_NAME%.
    docker rm -f %CONTAINER_NAME% >nul
)

:: 3. Run the new container
echo Starting new container
docker run -d ^
  --name %CONTAINER_NAME% ^
  -p %PORT_MAPPING% ^
  --restart unless-stopped ^
  %IMAGE_NAME%

if %ERRORLEVEL% neq 0 (
    echo Failed to start the container!
    exit /b %ERRORLEVEL%
)

echo Deployment complete! Your app is running at http://localhost:%TARGET_PORT%
endlocal