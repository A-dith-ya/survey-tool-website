import express, { Router } from "express";
import * as surveys from "../controllers/surveys";
import { requireAuth } from "../middleware/Auth";

const router: Router = express.Router();

router.post("/", requireAuth, surveys.createSurvey);

router.get("/", requireAuth, surveys.listSurveys);
router.get("/:surveyId", requireAuth, surveys.getSurvey);
router.get("/open/:surveyId", surveys.getSurveyResponse);

router.put("/status", requireAuth, surveys.updateStatus);

router.delete("/", requireAuth, surveys.deleteSurvey);

export default router;
