const Router = require("express-promise-router");
const controller = require("./controller");
const routecity = new Router();

routecity.get("/:id", controller.getCityName);
routecity.post("/", controller.createCity);
routecity.delete("/:id", controller.removecity);
routecity.put("/:id", controller.updateCity);
module.exports = routecity;
