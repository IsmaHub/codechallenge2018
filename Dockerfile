FROM node:10.14.1-jessie

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 9200:9200

RUN node .
