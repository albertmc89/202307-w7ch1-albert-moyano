import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../..";
import { connectToDataBase } from "../../../database/connectToDataBase";
import Thing, { type ThingStructure } from "../../../database/models/Thing";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Thing.deleteMany();
});

const mockThings: ThingStructure[] = [
  {
    id: new mongoose.Types.ObjectId().toString(),
    description: "Explain stoppers",
  },
  {
    id: new mongoose.Types.ObjectId().toString(),
    description: "Assist to physiotherapy",
  },
];

describe("Given a GET '/things' endpoint", () => {
  beforeEach(async () => {
    await Thing.create(mockThings);
  });
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and things 'Explain stoppers' and 'Assist to physiotherapy'", async () => {
      const expectedStatusCode = 200;
      const path = "/things";

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { things: ThingStructure[] };

      mockThings.forEach(({ description }, thingPosisiton) => {
        expect(responseBody.things[thingPosisiton]).toHaveProperty(
          "description",
          description
        );
      });
    });
  });
});
