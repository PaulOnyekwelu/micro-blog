FROM node:14.18.1-alpine3.14
RUN addgroup app && adduser -S -G app app
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]
