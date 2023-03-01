import express, { Router } from "express";
import * as users from "../controllers/users";
import { requireAuth } from "../middleware/Auth";

const router: Router = express.Router();

router.post("/", users.createUser);
router.post("/login", users.loginUser);

router.get("/", requireAuth, users.getUser);

router.put("/", requireAuth, users.putUser);

router.delete("/", requireAuth, users.deleteUser);
router.delete("/logout", requireAuth, users.logoutUser);

export default router;
