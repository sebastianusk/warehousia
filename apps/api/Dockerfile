FROM node:14.17-buster
WORKDIR /app
COPY ./dist/apps/api .
COPY ./design ./design
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib ts-morph apollo-server-express@2.25.2
CMD node ./main.js
