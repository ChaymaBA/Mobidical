#!/bin/bash
# save as deploy.sh

# Default to development if no environment is specified
source "$(dirname "$0")/env-setup.sh" $1

docker compose down 

# Build and start the containers for the specified environment
docker compose up app --build -d

echo "Containers are up and running for the $ENV environment."
