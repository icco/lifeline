FROM node:10
EXPOSE 8080
COPY . .
RUN yarn run build
CMD yarn run start -p 8080
