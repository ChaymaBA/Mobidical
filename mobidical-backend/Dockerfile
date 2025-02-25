# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make all .sh scripts executable
RUN find /app -type f -name "*.sh" -exec chmod +x {} \;

# Build the TypeScript code
RUN npm run build

# Create a non-root user and group for better security
RUN addgroup --system nodeapp && \
    adduser --system --ingroup nodeapp nodeapp

# Set ownership of the application files to the non-root user
RUN chown -R nodeapp:nodeapp /app

# Switch to the non-root user
USER nodeapp

# Expose the application port (default to 3000 if $PORT is not set)
ENV PORT=3000
EXPOSE $PORT

# Health check to ensure the application is running
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:$PORT/health || exit 1

# Run the application
CMD ["npm", "run", "start"]
