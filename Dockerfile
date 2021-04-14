FROM node:14-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --non-interactive --frozen-lockfile
ENV NODE_ENV=production
ENV PORT=8080

COPY . .
RUN yarn run build
CMD ["yarn", "run", "start"]
