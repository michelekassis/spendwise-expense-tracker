FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

RUN npm ci --only=production

# Copy the rest of the source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]