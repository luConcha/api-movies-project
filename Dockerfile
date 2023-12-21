#Dockerfile para el backend (Express)
FROM node:18

WORKDIR /app/backend

COPY  package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "server"]