import {
  BadRequest,
  InternalServerError,
  UnprocessableEntity,
} from "@schemas/error-response.schema";

export const userSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      example: "ab32e631-208d-4d8e-bbee-d7577b2c1b34",
    },
    email: {
      type: "string",
      example: "example@example.com",
    },
    created_at: {
      type: "string",
      example: "2023-08-04T01:35:24.685Z",
    },
  },
};

const bodySchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      example: "example@example.com",
    },
    password: {
      type: "string",
      format: "password",
      example: "123456",
    },
  },
  required: ["email", "password"],
};

const responseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "User created successfully",
    },
    user: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "ab32e631-208d-4d8e-bbee-d7577b2c1b34",
        },
        email: {
          type: "string",
          example: "example@example.com",
        },
        created_at: {
          type: "string",
          example: "2023-08-04T01:35:24.685Z",
        },
      },
    },
  },
};

const createAccount = {
  tags: ["Users"],
  description: "Create a new account",
  security: [],
  responses: {
    "200": {
      description: "User created",
      content: {
        "application/json": {
          schema: responseSchema,
        },
      },
    },
    ...BadRequest,
    ...UnprocessableEntity,
    ...InternalServerError,
  },
  requestBody: {
    description: "Object needed to do login",
    content: {
      "application/x-www-form-urlencoded": {
        schema: bodySchema,
      },
      "application/json": {
        schema: bodySchema,
      },
    },
    required: true,
  },
};

export default {
  "/users": {
    post: createAccount,
  },
};
