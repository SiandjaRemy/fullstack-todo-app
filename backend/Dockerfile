FROM node:22-bullseye-slim

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend/src ./src

COPY backend/.sequelizerc ./

EXPOSE 5001

CMD ["node", "src/server.js"]
