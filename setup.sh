#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# --- CONFIGURATION ---
IMAGE_NAME="medisim-app"
CONTAINER_NAME="medisim-app-container"

# Use the first script argument ($1) if provided; otherwise, default to 9966
TARGET_PORT=${1:-9966}
PORT_MAPPING="${TARGET_PORT}:80"
# ---------------------

echo "Starting deployment process..."
echo "Using host port: $TARGET_PORT"

# 1. Build the Docker image
echo "Building Docker image: $IMAGE_NAME..."
docker build -t $IMAGE_NAME .

echo "Build is Ok"

# 2. Check if an old container is running and remove it
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo "stop existing container ($CONTAINER_NAME)."
  docker rm -f $CONTAINER_NAME
fi

# 3. Run the new container
echo "Starting new container"
docker run -d \
  --name $CONTAINER_NAME \
  -p $PORT_MAPPING \
  --restart unless-stopped \
  $IMAGE_NAME

echo "Deployment complete! Your app is running at http://localhost:$TARGET_PORT"
