FROM node:18.17-slim

WORKDIR /app

COPY package.json .
ENV DIST_DIR=build
RUN apt-get update
RUN apt-get install inetutils-ping curl -y
RUN npm install --include=dev
RUN npm install --global pm2
COPY . .
RUN yarn build
EXPOSE 3000

#CMD ["/bin/sh", "-c", "pm2 start 'yarn start:prod' --name Gizka"]
