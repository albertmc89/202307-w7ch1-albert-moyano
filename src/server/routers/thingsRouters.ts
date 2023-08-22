import express from "express";
import {
  deleteThingById,
  getThingById,
  getThings,
} from "../controller/things/thingsController.js";

const thingsRouter = express.Router();

thingsRouter.get("/", getThings);
thingsRouter.get("/:idThing", getThingById);
thingsRouter.delete("/:idThing", deleteThingById);

export default thingsRouter;
