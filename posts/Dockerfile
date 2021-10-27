FROM node:alpine
RUN sudo addgroup app && adduser -S -G app app
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]