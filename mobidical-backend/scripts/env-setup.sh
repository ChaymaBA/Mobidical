#!/bin/bash
# save as env_setup.sh

# Default to development if no environment is specified
ENV=${1:-development}

# Validate environment
if [[ ! "$ENV" =~ ^(development|staging|production)$ ]]; then
    echo "Invalid environment. Please use: development, staging, or production"
    exit 1
fi

# Export the environment variable
export ENV=$ENV

# Load environment variables
set -o allexport
source ./config/.env.${ENV}.local
set +o allexport
