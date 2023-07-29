FROM node:18.17.0-alpine3.17
WORKDIR /app
COPY . .
RUN npm i
ENTRYPOINT [ "npm", "run",  "start:dev" ]
