# deploying react application to nginx server
FROM nginx:alpine
RUN addgroup app && adduser -S -G app app
WORKDIR /usr/share/nginx/html/
COPY ./build .

# deploying react application to apache2 server
# FROM httpd:alpine
# RUN addgroup app && adduser -S -G app app
# WORKDIR /usr/local/apache2/htdocs/
# COPY ./build .
