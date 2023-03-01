import { Response } from "express";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserAuthInfoRequest } from "../interfaces/request";
import { validate } from "class-validator";
import { UserRepository } from "../repositories/user.repository";

export const createUser = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check email exists
    const existingEmail = await UserRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      res.status(409).send("Email already exists");
      return;
    }

    // Create user
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    // Verify User data
    const errors = await validate(user);
    if (errors.length > 0) throw new Error(`Incorrect User info`);

    user.password = await bcrypt.hash(password, 10);
    await UserRepository.save(user);

    const token = await jwt.sign(
      { userId: user.id, username, email },
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // Set token as HttpOnly cookie
    res.cookie("token", token, { httpOnly: true });

    res.status(201).send("Created user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const loginUser = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.findOne({
      where: { email },
    });
    if (!user) {
      res.status(401).send("Invalid email or password");
      return;
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      res.status(401).send("Invalid email or password");
      return;
    }

    const token = await jwt.sign(
      { userId: user.id, username: user.username, email },
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send("Logged in");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const putUser = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    // Verify User data
    const errors = await validate(user);
    if (errors.length > 0) throw new Error(`Incorrect User info`);

    user.password = await bcrypt.hash(password, 10);

    await UserRepository.update(
      { id: req.userId },
      { username, email, password: user.password }
    );

    const token = await jwt.sign(
      { userId: req.userId, username, email },
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send("Updated user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const logoutUser = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie("token");
    res.status(200).send("User logged out");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getUser = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await UserRepository.findOne({
      where: { id: req.userId },
    });

    res.status(200).send({ username: user!.username, email: user!.email });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteUser = async (
  req: UserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie("token");
    await UserRepository.delete({ id: req.userId });
    res.status(200).send("Deleted user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
