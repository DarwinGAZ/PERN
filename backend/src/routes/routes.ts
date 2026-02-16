import { Router } from "express";
import * as pingController from "../controllers/ping.controller";
import * as apiController from "../controllers/api.controller";
import * as userController from "../controllers/user.controller";
import { verifyJWT } from "../libs/jwt";

export const routes = Router();

routes.get("/ping", pingController.ping);
routes.get("/api", apiController.api);
routes.get("/users", verifyJWT, userController.getAllUsers);

routes.post("/register", userController.createNewUser);
routes.post("/login", userController.login);
