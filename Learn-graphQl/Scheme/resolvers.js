const { users } = require("../fakeData");
const fetch = require("node-fetch");

const resolvers = {
  Query: {
    getAllUser() {
      return users;
    },
    getPersonData() {
      return { PersonName: "vijay" };
    },
    getJsonData: async (_, { id }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      return response.json();
    },
    getJsonDatas: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/`
      );
      return response.json();
    },
    getStateData: async () => {
      const response = await fetch(`http://localhost:3002/api/v1/mstate/`);
      console.log(response);
      return response.json();
    },
  },
  Mutation: {
    createUser(parent, args) {
      const newUser = args;
      users.push(newUser);
      return newUser;
    },
    createState: async (parent, args) => {
      const newState = args;

      console.log("args", args);
      const response = await fetch(`http://localhost:3002/api/v1/mstate/`, {
        method: "post",
        body: JSON.stringify(newState),
        headers: { "Content-Type": "application/json" },
      });

      return response.json();
    },
    DeleteState: async (_, args) => {
      const response = await fetch(
        `http://localhost:3002/api/v1/mstate/${args.id}`,
        {
          method: "DELETE",
        }
      );
      return response.json();
    },
    UpdateState: async (parent, args) => {
      const data = {
        statecode: args.statecode,
        statename: args.statename,
      };
      const response = await fetch(
        `http://localhost:3002/api/v1/mstate/${args.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.json();
    },
  },
};

module.exports = { resolvers };
