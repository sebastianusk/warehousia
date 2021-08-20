FROM node:14.17-slim AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY design ./design/
COPY workspace.json .
COPY nx.json .
COPY tsconfig.base.json .

RUN npm install
COPY ./apps/api ./apps/api
RUN npm run build-api

FROM node:14.17-slim
WORKDIR /app
COPY --from=builder /app/dist/apps/api .
COPY --from=builder /app/design ./design
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production
# dependencies that apps needs
RUN npm install @prisma/client reflect-metadata tslib ts-morph apollo-server-express@2.25.2
CMD node ./main.js
