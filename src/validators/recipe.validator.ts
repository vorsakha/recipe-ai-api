import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

export const recipeStoreValidator = [
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("ingredients")
    .isString()
    .notEmpty()
    .withMessage("Ingredients is required"),
  body("locale").optional().isString().withMessage("Locale must be a string"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return next();
  },
];

export const recipeShowValidator = [
  param("id").isUUID().withMessage("Id is invalid"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return next();
  },
];

export const recipeUpdateValidator = [
  param("id").isUUID().withMessage("Id is invalid"),
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),
  body("rules").isArray().withMessage("Rules must be an array"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return next();
  },
];

export const recipeDeleteValidator = [
  param("id").isUUID().withMessage("Id is invalid"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return next();
  },
];
