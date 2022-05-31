FROM node:14-alpine

WORKDIR /src

COPY /package.json ./
RUN yarn install

COPY ./ .

RUN yarn build