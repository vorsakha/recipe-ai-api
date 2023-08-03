import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} from "http-status";

const InternalServerError = {
  [INTERNAL_SERVER_ERROR]: {
    description: "Error: Internal Server Error",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
    "x-default-code": "5xx",
  },
};

const NotFound = {
  [NOT_FOUND]: {
    description: "Error: Not Found",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

const UnprocessableEntity = {
  [UNPROCESSABLE_ENTITY]: {
    description: "Error: Unprocessable Entity",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  value: {
                    type: "string",
                  },
                  msg: {
                    type: "string",
                    example: "Any error",
                  },
                },
              },
            },
          },
          required: ["message"],
          optional: ["errors"],
        },
      },
    },
  },
};

const BadRequest = {
  [BAD_REQUEST]: {
    description: "Error: Bad Request",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

const Unauthorized = {
  [UNAUTHORIZED]: {
    description: "Error: Unauthorized",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export {
  InternalServerError,
  NotFound,
  UnprocessableEntity,
  BadRequest,
  Unauthorized,
};
