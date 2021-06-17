const express = require("express");
const app = express();
const routes = require("./src/student/routes");
const routecity = require("./src/student/routeCity");
const cors = require("cors");
const controller = require("./src/student/controller");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The port is listen");
});
app.use(cors());
app.get("/api/v1/mstate/state", controller.getStateNameData);

app.use(cors());
app.use("/api/v1/mstate", routes);

app.use(cors());
app.use("/api/v1/mstate/state/city", routecity);
  
const server = app.listen(3002, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("My student backend listen", host, port);
});
