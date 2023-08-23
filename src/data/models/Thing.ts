import { Schema, model } from "mongoose";

export interface ThingStructure {
  id: string;
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
