FROM node:22 AS build_web

RUN mkdir /web
COPY ./web /web

WORKDIR /web

RUN npm ci
RUN npm run build

RUN rm -rf ./node_modules

FROM node:22 AS build_server

RUN mkdir /server
COPY ./server /server

WORKDIR /server

RUN npm ci
RUN npm run build

RUN rm -rf ./node_modules

# --> MAIN CONTAINER

FROM node:22

RUN npm i -g pm2

RUN mkdir /app
RUN mkdir /var/checkboxcraft

# ENV

ENV HTTPS=YES
ENV HTTPS_CERT=/var/checkboxcraft/https.crt
ENV HTTPS_KEY=/var/checkboxcraft/https.key

ENV FIELD_FILE=/var/checkboxcraft/field.bin

# WEB

RUN mkdir /app/web
COPY --from=build_web /web /app/web

WORKDIR /app/web

RUN npm ci --production

# SERVER

RUN mkdir /app/server
COPY --from=build_server /server /app/server

WORKDIR /app/server

RUN npm ci --production

# START

COPY ./run.sh /app

EXPOSE 443
EXPOSE 80

WORKDIR /app
CMD ["sh", "run.sh"]
