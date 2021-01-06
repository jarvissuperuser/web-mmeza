### STAGE 1: Build ###
#FROM node:12.7-alpine AS build
#WORKDIR /usr/src/app
#COPY ./src ./
#RUN npm install
#COPY . .
#RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY  ./src /usr/share/nginx/html
#VOLUME /etc/letsencrypt/live
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
EXPOSE 80
