import { Schema, model, type ObjectId } from "mongoose";

export interface ThingStructure {
  id: ObjectId;
  description: string;
}

const thingSchema = new Schema<ThingStructure>({
  description: {
    type: String,
    required: true,
  },
});

const Thing = model("Thing", thingSchema, "things");

export default Thing;
