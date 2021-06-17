const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const app = express();
const { typeDefs } = require("./Scheme/typeDefs");
const { resolvers } = require("./Scheme/resolvers");
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
const service = app.listen(3001, function () {
  const host = service.address().address;
  const port = service.address().port;
  console.log("App listen on", host, port);
});
