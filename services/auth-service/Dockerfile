FROM node:20-alpine

WORKDIR /app

# Copy root monorepo files
COPY package.json package-lock.json ./

# Copy all internal package.json files to allow npm to resolve workspaces
COPY packages/ ./packages/
COPY services/auth-service/package.json ./services/auth-service/

# Install dependencies from the root context
RUN npm install

# Copy service source code
COPY services/auth-service/ ./services/auth-service/

WORKDIR /app/services/auth-service

EXPOSE 4001

CMD ["npm", "run", "dev"]
