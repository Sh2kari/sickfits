// This file connects to remote prisma db and gives ability to query it with js
const { Prisma } = require('prisma-binding');

const db = new Prisma({
  typeDefs: './src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true
});

module.exports = db;
