import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import CustomError from "../../../../CustomError/CustomError.js";
import Thing, {
  type ThingStructure,
} from "../../../../database/models/Thing.js";
import { type ParamIdRequest } from "../../../../types.js";
import { getThingById } from "../thingsControllers.js";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const mockThings: ThingStructure[] = [
  {
    id: new mongoose.Types.ObjectId().toString(),
    description: "Do homework",
  },
];

const req: Partial<Request> = {
  params: {
    id: mockThings.toString(),
  },
};

const next: NextFunction = jest.fn();

Thing.findById = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue(mockThings),
});

describe("Given a getThingById controller", () => {
  describe("When it receives a response", () => {
    Thing.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockThings),
    });

    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await getThingById(req as ParamIdRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the method json should be called an object with a thing 'Do homework", async () => {
      await getThingById(req as ParamIdRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ thing: mockThings });
    });

    test("Then it should call the received next function with a 404 'Thing not found' error", async () => {
      Thing.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      const expectedError = new CustomError(
        "Thing not found",
        404,
        "Thing not found"
      );

      await getThingById(req as ParamIdRequest, res as Response, next);

      expect(next).toBeCalledWith(expectedError);
    });
  });
});

describe("Given a getThingById controller", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the received next function with a 500 'Cant't retrieve athelete error", async () => {
      const error = new CustomError(
        "Can't retrieve thing",
        500,
        "Can't retrieve thing"
      );

      Thing.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await getThingById(req as ParamIdRequest, res as Response, next);

      expect(next).toBeCalledWith(error);
    });
  });
});
