import { type NextFunction, type Request, type Response } from "express";
import { things } from "../../../data/data.js";
import CustomError from "../../middlewares/CustomError/CustomError.js";

export const getThings = (_req: Request, res: Response) => {
  res.status(200);
  res.json({ things });
};

export const getThingById = (req: Request, res: Response) => {
  const { idThing } = req.params;

  const thingById = things.find((thing) => thing.id === +idThing);

  res.status(200).json({ thing: thingById });
};

export const deleteThingById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idThing } = req.params;

  const thingToDeletePosition = things.findIndex(
    (thing) => thing.id === Number(idThing)
  );

  if (thingToDeletePosition === -1) {
    next(new CustomError("Thing not found", 404));
    return;
  }

  things.splice(thingToDeletePosition, 1);

  res.status(200).json({ message: "Thing deleted" });
};
