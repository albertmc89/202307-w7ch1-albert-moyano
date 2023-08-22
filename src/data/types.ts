import { type Request } from "express";

export interface Thing {
  id: number;
  description: string;
}

export type ParamIdRequest = Request<{ id: string }>;
