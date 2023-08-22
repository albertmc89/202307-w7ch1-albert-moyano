import { type Request, type Response } from "express";
import { things } from "../../../data/data.js";

export const getThings = (_req: Request, res: Response) => {
  res.status(200);
  res.json({ things });
};

export const getThingById = (req: Request, res: Response) => {
  console.log("Request with GET method to get a single thing");
  const { idThing } = req.params;

  const thingById = things.find((thing) => thing.id === Number(idThing));

  res.status(200).json(thingById);
};

export const deleteThingById = (req: Request, res: Response) => {
  const { idThing } = req.params;

  const thingToDeletePosition = things.findIndex(
    (thing) => thing.id === Number(idThing)
  );

  things.splice(thingToDeletePosition, 1);

  res.status(200).json({ message: "Thing deleted" });
};
