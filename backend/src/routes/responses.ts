import express, { Router } from "express";
import * as responses from "../controllers/responses";
import { requireAuth } from "../middleware/Auth";

const router: Router = express.Router();

router.post("/", responses.createResponse);

router.get("/", responses.getResponses);

export default router;
