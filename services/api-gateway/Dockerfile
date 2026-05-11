FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/ ./packages/
COPY services/api-gateway/package.json ./services/api-gateway/

RUN npm install

COPY services/api-gateway/ ./services/api-gateway/

WORKDIR /app/services/api-gateway

EXPOSE 4000

CMD ["npm", "run", "dev"]
