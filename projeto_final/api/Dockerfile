FROM node:18-slim

WORKDIR /home/src/api

COPY . .


CMD ["sh", "-c","npm install && npm run typeorm migration:run && npm run dev"]

