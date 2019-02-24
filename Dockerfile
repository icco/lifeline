FROM node:10
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build

ENV PORT 8080
CMD yarn run start
