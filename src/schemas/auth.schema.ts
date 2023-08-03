import {
  BadRequest,
  InternalServerError,
  UnprocessableEntity,
} from "@schemas/error-response.schema";

const bodySchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      format: "password",
    },
  },
  required: ["email", "password"],
};

const responseSchema = {
  type: "object",
  required: ["token"],
  properties: {
    token: {
      type: "string",
    },
    user: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        email: {
          type: "string",
        },
        created_at: {
          type: "string",
        },
      },
    },
  },
};

const login = {
  tags: ["Auth"],
  description: "Login",
  security: [],
  responses: {
    "200": {
      description: "Logged",
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
  "/auth": {
    post: login,
  },
};
