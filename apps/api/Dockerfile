FROM node:14.17-slim
WORKDIR /app
COPY dist/apps/api .
COPY design ./design
COPY prisma ./prisma
COPY .staging.env ./.env
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production
# dependencies that apps needs
RUN npm install @prisma/client reflect-metadata tslib ts-morph apollo-server-express@2.25.2
RUN npm run prisma generate
CMD node ./main.js
