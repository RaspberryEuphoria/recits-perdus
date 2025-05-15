FROM node:18.17-slim

WORKDIR /app

COPY package.json .
RUN apt-get update
RUN apt-get install python3 python3-pip curl -y
RUN npm install
COPY . .
EXPOSE 8080

RUN npm run build

# La commande suivante copie le contenu de /build/src dans /src à la racine
# pour avoir des fichiers .js et non pas des fichiers .ts
RUN cd /app && rm -rf src && cp -r build/src .
