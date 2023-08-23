import mongoose from "mongoose";

export const connectToDataBase = async (mongoDbUrl: string) => {
  await mongoose.connect(mongoDbUrl);
};
