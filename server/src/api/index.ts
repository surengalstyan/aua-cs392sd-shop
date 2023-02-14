import express from "express";
import cors from "cors";
import { thirdPartyApi } from "./third-party";
import { internalApi } from "./internal";

const api = express();
api.use(cors());
api.use(express.json());

// external
api.use("/api", thirdPartyApi);

// internal
api.use("/", internalApi);

export { api };
