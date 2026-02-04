# ============================================
# MEDUSA BACKEND - PRODUCTION DOCKERFILE
# ============================================

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 medusa && \
    adduser --system --uid 1001 medusa

# Copy built application
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/medusa-config.ts ./medusa-config.ts

# Copy src folder (needed for custom modules like mercadopago)
COPY --from=builder /app/src ./src

# Set ownership
RUN chown -R medusa:medusa /app

USER medusa

EXPOSE ${PORT:-9000}

CMD ["npm", "run", "start"]
