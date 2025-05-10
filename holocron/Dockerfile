FROM node:18.17.0-alpine as builder

WORKDIR /app

COPY package.json ./

RUN npm install --only-production

COPY ../../holocron/* .

RUN npm run build

FROM node:18.17.0-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/

EXPOSE 8080

CMD ["npm", "start"]
