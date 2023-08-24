import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import { type ThingStructure } from "../../../../data/models/Thing";
import { type ParamIdRequest } from "../../../../data/types";
import { deleteThingById } from "../thingsController";

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

describe("Given a getThingById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await deleteThingById(req as ParamIdRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
