FROM node:13 AS compile

WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN ng build --prod

FROM nginx:alpine

COPY ./.docker/ngnix/default.conf /etc/nginx/conf.d/
COPY --from=compile /usr/src/app/dist/speedmeet /usr/share/nginx/html

