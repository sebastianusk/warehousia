# Warehousia

[![API Warehousia](https://github.com/sebastianusk/warehousia/actions/workflows/build-api.yaml/badge.svg)](https://github.com/sebastianusk/warehousia/actions/workflows/build-api.yaml)

[![Admin Warehousia](https://github.com/sebastianusk/warehousia/actions/workflows/build-admin.yaml/badge.svg)](https://github.com/sebastianusk/warehousia/actions/workflows/build-admin.yaml)

This project was generated using [Nx](https://nx.dev).

## Applications

### React Admin Application

An application build on top of react to build the front end application

To run it:

```
npm start
```

### NestJS Graphql Application

An application using graphql to manage the data on the backend

To run it:

```
npm run gql
```

### Database management

A lot of things need to be done in database side

#### Initial Setup (Just clone, fresh db)
```
npm run db:up
npm run db:push
npm run db:seed
```

### Want to turn off your database
because you have to run other databse on other project
```
npm run db:down
```

#### Turn on your database
```
npm run db:up
```

### Change the Schema
Our database is controlled by prisma, prisma file is here: `prisma/schema.prisma`, during the development, you'll need to run this in order to just push the DB and
```
npm run db:push
```
during the development, in case you found that the previous change is not good, you can refresh the database
```
npm run db:reset
npm run db:seed
```
After the development finalize, you can run the migration to generate the migration schema
```
npm run db:migrate
```

### update your changes in the staging/production
change `.env` to point to the staging/prod db, you can run it by
```
npm run db:deploy
```
you can run reset into staging if needed. BE CAREFUL not to run reset in prod. do snapshot often
