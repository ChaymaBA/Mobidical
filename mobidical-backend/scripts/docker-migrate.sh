#!/bin/bash

# Ensure the environment argument is provided
if [ -z "$1" ]; then
    echo "Please provide an environment (e.g., development, staging, production)"
    echo "Usage: npm run docker:migrate [environment] [migration-name]"
    exit 1
fi

# Set the environment
ENV=$1
export ENV
source "$(dirname "$0")/env-setup.sh" "$ENV"

# Ensure the migration name argument is provided
if [ -z "$2" ]; then
    echo "Please provide a migration name"
    echo "Usage: npm run docker:migrate [environment] [migration-name]"
    exit 1
fi

# Set the migration name
MIGRATION_NAME=$2
TASK="migration:generate src/migrations/$MIGRATION_NAME"
export TASK

# Generate migration
echo "Generating migration: $MIGRATION_NAME for the $ENV environment..."
docker compose run --rm -e TASK migrate

# Apply the migration
TASK="migration:run"
export TASK
echo "Applying migration: $MIGRATION_NAME for the $ENV environment..."
docker compose run --rm -e TASK migrate

echo "Migration completed successfully."
