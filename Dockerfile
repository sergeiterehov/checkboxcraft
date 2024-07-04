FROM node:22

RUN npm i -g pm2

RUN mkdir /app
RUN mkdir /app/web
RUN mkdir /app/server

COPY ./run.sh /app
COPY ./web /app/web
COPY ./server /app/server

WORKDIR /app/web
RUN npm ci
RUN npm run build

WORKDIR /app/server
RUN npm ci
RUN npm run build

EXPOSE 8080

WORKDIR /app
CMD ["sh", "run.sh"]
