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

const mockThings: ThingStructure = {
  id: new mongoose.Types.ObjectId().toString(),
  description: "Explain stoppers",
};

describe("Given a GET '/:idThing' endpoint", () => {
  beforeEach(async () => {
    await Thing.create(mockThings);
  });

  describe("When it receives a request with 'Explain stoppers' id ", () => {
    test("Then it should respond with status 200 and the thing 'Explain stoppers'", async () => {
      const expectedStatusCode = 200;

      await request(app)
        .get(`/things/${mockThings.id}`)
        .expect(expectedStatusCode);
    });
  });
});

describe(`Given a GET '/things/15' endpoint`, () => {
  beforeEach(async () => {
    await Thing.create(mockThings);
  });

  describe("When it receives a request with an id '15'", () => {
    test(`Then it should respond with a status 500 and an error 'Can't retrieve thing'}`, async () => {
      const expectedStatusCode = 500;
      const expectedMessage = "Can't retrieve thing";
      const path = "/things/15";

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { thing: ThingStructure[] };

      expect(responseBody).toHaveProperty("error", expectedMessage);
    });
  });
});
