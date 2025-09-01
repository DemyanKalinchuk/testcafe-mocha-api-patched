FROM node:20-bullseye
RUN apt-get update && apt-get install -y chromium && rm -rf /var/lib/apt/lists/*
ENV CI true
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "test:tc"]
