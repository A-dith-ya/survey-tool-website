import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { config } from "../config";
import { UserAuthInfoRequest } from "../interfaces/request";

export const requireAuth = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check for authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Unauthorized");
    }

    // Verify token
    const token = req.header("Authorization")!.replace("Bearer ", "");

    const payload: any = jwt.verify(token, config.JWT_SECRET);
    req.userId = payload.userId;
    req.username = payload.username;
    req.email = payload.email;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
};
