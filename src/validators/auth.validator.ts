import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { UNPROCESSABLE_ENTITY } from "http-status";

export const authPostValidator = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    return next();
  },
];
