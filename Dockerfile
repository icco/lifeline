FROM node:10-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache git
COPY package.json yarn.lock ./
RUN yarn install --non-interactive --frozen-lockfile
ENV NODE_ENV=production
ENV PORT=8080

COPY . .
RUN yarn run build
CMD yarn run start
