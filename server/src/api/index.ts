require("express-async-errors");
import express, { Request, Response } from "express";
import cors from "cors";
import { thirdPartyApi } from "./third-party";
import { internalApi } from "./internal";
import { isHttpError } from "http-errors";

const api = express();

api.use(cors());
api.use(express.json());

// external
api.use("/api", thirdPartyApi);

// internal
api.use("/", internalApi);

api.use((err: any, req: Request, res: Response, next: any) => {
  if (isHttpError(err)) {
    console.log(err);
    res.status(err.statusCode).send({ errors: err.message });
  }
  res.status(500).send({ errors: "['Internal Server Error']" });
});

export { api };
