# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 80

# CMD ["npm", "start"]

# -----------------------------------------------------------

# Build Stage
# FROM node:20-alpine AS builder

# Set working directory
# WORKDIR /app

# Copy package.json and install dependencies
# COPY package*.json ./
# RUN npm install

# Install sharp for image optimization
# RUN npm install sharp

# Copy the rest of the application code
# COPY . .

# Build the Next.js app for production
# RUN npm run build

# Production Stage
# FROM node:20-alpine

# Set working directory
# WORKDIR /app

# Copy the production build from the builder stage
# COPY --from=builder /app ./

# Install only production dependencies
# RUN npm install --production

# Expose the port
# EXPOSE 3000

# Start the app
# CMD ["npm", "start"]






# Stage 1: Install dependencies (cached)
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --cache /usr/local/npm_cache

# Stage 2: Build the app (non-cached)
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./
COPY . .

# Install next globally
RUN npm install -g next

# Production stage
RUN npm ci --production

# Expose port and start the app (adjust path if needed)
EXPOSE 3001
CMD ["/usr/local/bin/next", "start"]
