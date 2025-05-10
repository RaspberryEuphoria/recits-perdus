FROM node:18.17.0-alpine AS base

WORKDIR /app
COPY package.json .

RUN pwd
RUN npm install sharp --ignore-scripts
RUN npm install

COPY . .
EXPOSE 8080

FROM base AS prod

RUN npm run build
RUN rm -rf ./src && mkdir ./src && mv ./build/src ./src
#RUN npm run db:migrate:prod
#CMD ["npm", "run", "start:prod"]
CMD ["ls", "-la", "/app"]

FROM base AS dev

RUN npm run db:migrate:dev
CMD ["npm", "run", "dev"]