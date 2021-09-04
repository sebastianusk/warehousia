# Warehousia

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

#### Setup First Time
```
npm run db:init
```

### Want to turn off your database
because you have to run other databse on other project
```
npm run db:down
```

### Turn on again your database
```
npm run db:up
```

### Refresh database
```
npm run db:refresh
```

### Reload Schema
Our database is controlled by prisma, prisma file is here: `prisma/schema.prisma`, after change the schema, we can reinitiate the database by
```
npm run db:reload
```
