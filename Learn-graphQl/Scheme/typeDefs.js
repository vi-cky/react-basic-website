const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    name: String!
    age: Int!
    married: Boolean!
  }
  type Person {
    PersonName: String!
  }
  type JsonData {
    userId: Int!
    id: Int!
    title: String!
    completed: Boolean!
  }
  type JsonDatas {
    userId: Int!
    id: Int!
    title: String!
    completed: Boolean!
  }
  type stateData {
    statecode: String
    statename: String
    id: Int
    success: Boolean
    message: String
  }
  type DeleteState {
    id: Int!
    success: Boolean
    message: String
  }
  type status {
    success: Boolean!
    message: String!
  }
  #Queries
  type Query {
    getAllUser: [User!]!
    getPersonData: Person
    getJsonData(id: Int!): JsonData
    getJsonDatas: [JsonDatas!]!
    getStateData: [stateData!]!
  }

  #Mutation
  type Mutation {
    createUser(name: String!, age: Int!, married: Boolean!): User!
    createState(statecode: String!, statename: String!, id: Int!): stateData!
    DeleteState(id: Int!): DeleteState!
    UpdateState(statecode: String!, statename: String!, id: Int!): stateData!
    StatusState(success: Boolean!, message: String!): status!
  }
`;

module.exports = { typeDefs };
