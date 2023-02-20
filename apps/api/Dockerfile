FROM node:14.17
WORKDIR /app
COPY dist/apps/api .
COPY design ./design
COPY prisma ./prisma
COPY .env ./.env
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production
RUN npm install --save-dev prisma@3.15.2
RUN npm install @prisma/client@3.15.2 reflect-metadata tslib ts-morph apollo-server-express@2.25.2
RUN npx prisma generate
CMD node ./main.js
