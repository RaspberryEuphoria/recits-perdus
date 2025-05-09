FROM node:18.17

WORKDIR /

COPY package.json .
RUN npm install
COPY . .
CMD ["npm","start"]
