FROM node:16-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++ python3 openjdk11
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
