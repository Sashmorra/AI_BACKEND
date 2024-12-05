FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i 
COPY prisma ./prisma

RUN npm run generate
COPY /dist ./dist

CMD ["node", "dist/main.js"]

