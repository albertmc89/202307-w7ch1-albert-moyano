import { type Request, type Response } from "express";
import mongoose from "mongoose";
import Thing, {
  type ThingStructure,
} from "../../../../database/models/Thing.js";
import { getThings } from "../thingsControllers.js";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

const mockThings: ThingStructure[] = [
  {
    id: new mongoose.Types.ObjectId().toString(),
    description: "Go to the beach",
  },
  {
    id: new mongoose.Types.ObjectId().toString(),
    description: "Think about final project",
  },
];

Thing.find = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue(mockThings),
});

describe("Given a getThings controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status with 200", async () => {
      const expectedStatusCode = 200;

      await getThings(req as Request, res as Response);

      expect(res.status).toBeCalledWith(expectedStatusCode);
    });
  });
});
