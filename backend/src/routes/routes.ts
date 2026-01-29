import { Router } from "express";
import * as pingController from "../controllers/ping.controller";
import * as apiController from "../controllers/api.controller";

export const routes = Router();

routes.get("/ping", pingController.ping);
routes.get("/api", apiController.api);
