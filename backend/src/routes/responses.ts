import express, { Router } from "express";
import * as responses from "../controllers/responses";

const router: Router = express.Router();

// Survey distribution routes
router.post("/", responses.createResponse);

router.get("/:surveyId", responses.getResponses);

export default router;
