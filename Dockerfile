FROM node:10.14.1-jessie

COPY ["./", "./"]

EXPOSE 9200:9200

RUN npm install