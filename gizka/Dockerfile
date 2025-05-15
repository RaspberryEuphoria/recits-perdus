FROM node:18.17.0-alpine

WORKDIR /app

COPY package.json .
ENV DIST_DIR=build
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000