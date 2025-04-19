# frontend/Dockerfile

# 1) Build your React/Vite app
FROM node:22-alpine AS builder
WORKDIR /app

# Install only the frontend's deps
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source
COPY frontend/ ./

# Copy your shared enums library into `/lib/socket-enums`
# so "../../../../lib/socket-enums/..." resolves to /lib/socket-enums
COPY lib/socket-enums /lib/socket-enums

# Now build (must match "build" in frontend/package.json)
RUN npm run build

# 2) Serve the compiled app with nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Clean default content
RUN rm -rf ./*

# Copy built files
COPY --from=builder /app/dist ./

# Copy your custom nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]