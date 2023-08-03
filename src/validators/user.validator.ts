import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const userPostValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return next();
  },
];
