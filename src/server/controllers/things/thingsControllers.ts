import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import Thing from "../../../database/models/Thing.js";
import { type ParamIdRequest } from "../../../types.js";

export const getThings = async (_req: Request, res: Response) => {
  const things = await Thing.find().exec();

  res.status(200).json({ things });
};

export const getThingById = async (
  req: ParamIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { idThing: id } = req.params;

  try {
    const thing = await Thing.findById(id).exec();

    if (typeof thing === "undefined") {
      const error = new CustomError("Thing not found", 404, "Thing not found");

      next(error);
      return;
    }

    res.status(200).json({ thing });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Can't retrieve thing",
      500,
      (error as Error).message
    );

    next(customError);
  }
};

export const deleteThingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idThing: id } = req.params;

  try {
    const thing = await Thing.findByIdAndDelete(id).exec();

    if (!thing) {
      next(new CustomError("Thing not found", 404, "Thing not found"));
      return;
    }
  } catch (error: unknown) {
    const customError = new CustomError(
      "Can't delete thing",
      500,
      (error as Error).message
    );

    next(customError);
  }

  res.status(200).json({ message: "Thing deleted" });
};
