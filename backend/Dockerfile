
    # backend/Dockerfile
    
    FROM node:22-alpine AS builder
    WORKDIR /app
    
    # copy only package.json & lockfile
    COPY backend/package*.json ./
    
    # install all deps (runtime + dev)
    RUN npm install
    
    # copy the rest of your backend code
    COPY backend/ ./
    
    # compile TypeScript → dist/
    RUN npm run build
    
    # --- production image ---
    FROM node:22-alpine
    WORKDIR /app
    
    # copy runtime deps only
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/dist ./dist
    
    ENV NODE_ENV=production
    EXPOSE 3000
    CMD ["node", "dist/main.js"]