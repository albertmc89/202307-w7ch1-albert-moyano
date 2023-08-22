import { type NextFunction, type Request, type Response } from "express";
import { type ParamIdRequest } from "../../../data/types.js";
import { deleteThingById, getThings } from "./thingsController.js";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getThings controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call method status with 200", () => {
      const expectedStatusCode = 200;

      getThings(req as Request, res as Response);

      expect(res.status).toBeCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json", () => {
      getThings(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given a deleteThingById controller", () => {
  const req: Partial<ParamIdRequest> = {
    params: {
      id: "1",
    },
  };

  describe("When it receives a response", () => {
    test("Then it should call method status with 200", () => {
      const expectedStatusCode = 200;

      deleteThingById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call method json with a message 'user deleted'", () => {
      const message = "Thing deleted";

      deleteThingById(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
