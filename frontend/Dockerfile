# Build stage
FROM node:22-bullseye-slim AS builder

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ ./

RUN npm run build --configuration production

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
