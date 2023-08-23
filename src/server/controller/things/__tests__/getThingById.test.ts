import { type NextFunction, type Response } from "express";
import { type ParamIdRequest, type Thing } from "../../../../data/types.js";
import { getThingById } from "../thingsController.js";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req: Partial<ParamIdRequest> = {
  params: {
    idThing: "1",
  },
};

const next: NextFunction = jest.fn();

describe("Given a getThingById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call method status with 200", () => {
      const expectedStatusCode = 200;

      getThingById(req as ParamIdRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the method json should be called with an object with id 1", () => {
      const things: Thing = {
        id: 1,
        description: "Play tennis",
      };

      getThingById(req as ParamIdRequest, res as Response, next);

      expect(res.json).toBeCalledWith({ thing: things });
    });
  });
});
