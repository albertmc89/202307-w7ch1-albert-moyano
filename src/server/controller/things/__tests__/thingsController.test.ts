import { type Request, type Response } from "express";
import { getThings } from "../thingsController.js";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

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

    test("Then it should call its method json with things", () => {
      getThings(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});
