FROM node:14.17
WORKDIR /app
COPY dist/apps/api .
COPY design ./design
COPY prisma ./prisma
COPY .env ./.env
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production
RUN npm install --save-dev prisma
RUN npm install @prisma/client reflect-metadata tslib ts-morph apollo-server-express@2.25.2
RUN npm run db:generate
CMD node ./main.js
