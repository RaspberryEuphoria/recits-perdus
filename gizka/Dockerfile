FROM node:18.17.0-alpine

WORKDIR /app

COPY package.json .
ENV DIST_DIR=build

RUN npm install
#RUN npm run build

COPY . .

EXPOSE 3000

#CMD ["npm", "run", "start:prod"]
CMD ["ls", "-la", "/app"]
