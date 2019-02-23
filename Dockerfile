FROM node:10
EXPOSE 8080
COPY . .
RUN ls -alh
CMD npm run start
