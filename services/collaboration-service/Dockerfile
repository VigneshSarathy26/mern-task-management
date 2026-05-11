FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/ ./packages/
COPY services/collaboration-service/package.json ./services/collaboration-service/

RUN npm install

COPY services/collaboration-service/ ./services/collaboration-service/

WORKDIR /app/services/collaboration-service

EXPOSE 4003

CMD ["npm", "run", "dev"]
