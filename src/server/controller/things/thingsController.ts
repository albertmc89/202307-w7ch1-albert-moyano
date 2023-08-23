import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { things } from "../../../data/data.js";
import Thing from "../../../data/models/Thing.js";
import { type ParamIdRequest } from "../../../data/types.js";

export const getThings = (_req: Request, res: Response) => {
  const things = Thing.find().exec();

  res.status(200).json({ things });
};

export const getThingById = (
  req: ParamIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { idThing } = req.params;

  try {
    const thing = things.find((thing) => thing.id === +idThing);

    if (!thing) {
      const error = new CustomError("Thing not found", 404, "Thing not found");

      next(error);
      return;
    }

    res.status(200).json({ thing });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Can't retrieve thing",
      404,
      (error as Error).message
    );

    next(customError);
  }

  res.status(200).json(Thing);
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
    next(new CustomError("Thing not found", 404, "Thing not found"));
    return;
  }

  things.splice(thingToDeletePosition, 1);

  res.status(200).json({ message: "Thing deleted" });
};
