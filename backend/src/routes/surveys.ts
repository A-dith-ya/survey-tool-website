import express, { Router } from "express";
import * as surveys from "../controllers/surveys";
import { requireAuth } from "../middleware/Auth";

const router: Router = express.Router();

router.post("/", requireAuth, surveys.createSurvey);

router.get("/", requireAuth, surveys.listSurveys);

router.delete("/", requireAuth, surveys.deleteSurvey);

export default router;
