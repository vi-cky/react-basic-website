const Router = require("express-promise-router");
const controller = require("./controller");

const route = new Router();

route.get("/", controller.getStateData);
route.post("/", controller.createStateData);
route.get("/:id", controller.getStateByCode);
route.delete("/:id", controller.removeState);
route.put("/:id", controller.updateState);

module.exports = route;
