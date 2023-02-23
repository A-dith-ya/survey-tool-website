import { Request } from "express";

export interface UserAuthInfoRequest extends Request {
  userId?: number;
  username?: string;
  email?: string;
}
