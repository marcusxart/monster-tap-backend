const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'MONSTER TAP  API Documentation',
    description: 'API documentation for the monster tap ServerSide API.',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:6600',
      description: 'Local server',
    },
    {
      url: 'https://monster-tap-backend.onrender.com',
      description: 'Development server',
    },
    // {
    //   url: 'https://backend.com.endpoint.ng/api/v1',
    //   description: 'Production server',
    // },
  ],
  paths: {
    // '/auth/sign-up': {
    //   post: {
    //     tags: ['Auth'],
    //     requestBody: {
    //       required: true,
    //       content: {
    //         'application/json': {
    //           schema: {
    //             type: 'object',
    //             properties: {
    //               email: { type: 'string' },
    //               password: { type: 'string' },
    //               confirmPassword: { type: 'string' },
    //             },
    //           },
    //         },
    //       },
    //     },
    //     responses: {
    //       201: {
    //         description: 'Successful operation',
    //       },
    //     },
    //   },
    // },

    '/auth/sign-up': {
      post: {
        tags: ['Auth'],
        parameters: [
          {
            in: 'query',
            name: 'referral_code',
            required: false,
            description: 'Optional referral code for the sign-up',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                  confirmPassword: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Successful operation',
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },

    '/auth/sign-in': {
      post: {
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
          },
        },
      },
    },

    '/auth/forget-password': {
      post: {
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
          },
        },
      },
    },

    '/auth/reset-password': {
      post: {
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                  confirmPassword: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
          },
        },
      },
    },

    '/auth/request-otp': {
      post: {
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
          },
        },
      },
    },

    '/auth/verify-otp': {
      post: {
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  otp: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
          },
        },
      },
    },

    '/account/incrementCoin/{id}': {
      get: {
        security: [
          {
            JWT: [],
          },
        ],
        tags: ['Account'],
        summary: 'Increment user coin count',
        description:
          "Increment the coin count of a specific user's account by 1.",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID of the user whose coin count will be incremented',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Coin count incremented successfully',
          },
          404: {
            description: 'User or account not found',
          },
        },
      },
    },

    '/account/getUserBonus/{id}': {
      post: {
        tags: ['Account'],
        summary: 'Get the balance of a specific user',
        description: 'Get the balance of a specific user.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'ID of the user whose bonus is to be returned',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Bonus returned successfully',
          },
          404: {
            description: 'User or account not found',
          },
        },
      },
    },
  },
  security: [
    {
      JWT: [],
    },
  ],
  components: {
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT Authorization header using the Bearer scheme',
      },
    },
  },
  cors: {
    enabled: true,
    origins: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Location', 'Access-Control-Expose-Headers'],
    maxAge: 3600,
    credentials: true,
  },
};

module.exports = swaggerDefinition;
