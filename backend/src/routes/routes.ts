import { Router } from "express";
import * as pingController from "../controllers/ping.controller";
import * as userController from "../controllers/user.controller";
import * as serviceController from "../controllers/services.controller";
import * as proposalController from "../controllers/proposal.controller";
import { verifyJWT } from "../libs/jwt";
import { verifyAdmin } from "../middleware/verifyAdmin";

export const routes = Router();

// PING

routes.get("/ping", pingController.ping);

// USER (LOGIN/REGISTER)

routes.post("/register", userController.createNewUser);
routes.post("/login", userController.login);

routes.get("/users", verifyJWT, verifyAdmin, userController.getAllUsers);
routes.get("/me", verifyJWT, userController.getUser);

routes.put("/updateUser", verifyJWT, userController.updateUser);

routes.delete(
    "/deleteUser/:id",
    verifyJWT,
    verifyAdmin,
    userController.deleteUser,
);

routes.put(
    "/users/:id/roles",
    verifyJWT,
    verifyAdmin,
    userController.updateUserRole,
);

// SERVICES

routes.post("/createService", verifyJWT, serviceController.createService);
routes.get("/services", serviceController.getAllServices);
routes.get("/me/services", verifyJWT, serviceController.getMyServices);
routes.get("/services/:id", verifyJWT, serviceController.getServiceById);
routes.delete("/deleteService/:id", verifyJWT, serviceController.deleteService);
routes.put(
    "/updateService/:serviceId",
    verifyJWT,
    serviceController.updateService,
);

// PROPOSAL

routes.post(
    "/services/:serviceId/createProposal",
    verifyJWT,
    proposalController.createProposal,
);

routes.get(
    "/services/:serviceId/proposals",
    verifyJWT,
    proposalController.getProposalsInServices,
);

routes.get("/proposal", verifyJWT, proposalController.getAllProposal);
routes.delete("/proposal/:id", verifyJWT, proposalController.deleteProposal);
routes.put("/updateProposal/:id", verifyJWT, proposalController.updateProposal);
