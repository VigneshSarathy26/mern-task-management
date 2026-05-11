# Build stage
FROM node:20-alpine as build-stage

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/

RUN npm install

COPY apps/web/ ./apps/web/

WORKDIR /app/apps/web
RUN npm run build

# Production stage
FROM nginx:stable-alpine

COPY --from=build-stage /app/apps/web/dist /usr/share/nginx/html
COPY deploy/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
