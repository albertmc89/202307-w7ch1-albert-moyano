import { type NextFunction, type Response } from "express";
import { type ParamIdRequest } from "../../../../data/types.js";
import { deleteThingById } from "../thingsController.js";

describe("Given a deleteThingById controller", () => {
  describe("When it receives a response", () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();

    const req: Pick<ParamIdRequest, "params"> = {
      params: {
        idThing: "1",
      },
    };

    test("Then it should call method status with 200", () => {
      const expectedStatus = 200;

      deleteThingById(req as ParamIdRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then the method json should be called an object with a message 'Thing deleted'", () => {
      const message = "Thing deleted";

      deleteThingById(req as ParamIdRequest, res as Response, next);

      expect(res.json).toBeCalledWith({ message });
    });

    test("Then the next function should be called with an error message 'Thing not found' and error status 404", () => {
      deleteThingById(req as ParamIdRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(new Error("Thing not found"));
    });
  });
});
