FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/ ./packages/
COPY services/task-service/package.json ./services/task-service/

RUN npm install

COPY services/task-service/ ./services/task-service/

WORKDIR /app/services/task-service

EXPOSE 4002

CMD ["npm", "run", "dev"]
