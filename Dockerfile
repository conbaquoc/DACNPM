FROM node:10-alpine as build

WORKDIR /app

ENV REACT_APP_SERVER_URL = http://3.19.213.107/api/v1

COPY package.json /app/package.json

RUN npm install --silent

COPY . /app
RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
