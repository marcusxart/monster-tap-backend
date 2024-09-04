const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'MONSTER TAP  API Documentation',
    description:
      'API documentation for the monster tap ServerSide API.',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:6600',
      description: 'Local server',
    },
    // {
    //   url: 'https://sterling-dictionary.onrender.com/api/v1',
    //   description: 'Development server',
    // },
    // {
    //   url: 'https://backend.com.endpoint.ng/api/v1',
    //   description: 'Production server',
    // },
  ],
  paths: {
    "/auth/sign-up": {
      post: {
        summary: 'Onboard Users',
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
          201: {
            description: 'Successful operation',
          },
        },
      },
    },

    "/auth/sign-in": {
        post: {
          summary: 'Sign in Users',
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
            201: {
              description: 'Successful operation',
            },
          },
        },
      },
      
    //   '/onboard-admin': {
    //     post: {
    //       summary: 'Onboard Admin',
    //       tags: ['Auth'],
    //       requestBody: {
    //         required: true,
    //         content: {
    //           'application/json': {
    //             schema: {
    //               type: 'object',
    //               properties: {
    //                 email: { type: 'string' },
    //                 password: { type: 'string' },
    //               },
    //             },
    //           },
    //         },
    //       },
    //       responses: {
    //         '201': {
    //           description: 'Successful operation',
    //         },
    //       },
    //     },
    //   },

    //   '/onboard-subadmin': {
    //     post: {
    //       summary: 'Onboard Sub-Admin',
    //       tags: ['Auth'],
    //       requestBody: {
    //         required: true,
    //         content: {
    //           'application/json': {
    //             schema: {
    //               type: 'object',
    //               properties: {
    //                 email: { type: 'string' },
    //                 password: { type: 'string' },
    //               },
    //             },
    //           },
    //         },
    //       },
    //       responses: {
    //         '201': {
    //           description: 'Successful operation',
    //         },
    //       },
    //     },
    //   },

    //   '/login': {
    //     post: {
    //       summary: 'logging in users',
    //       tags: ['Auth'],
    //       requestBody: {
    //         required: true,
    //         content: {
    //           'application/json': {
    //             schema: {
    //               type: 'object',
    //               properties: {
    //                 email: { type: 'string' },
    //                 password: { type: 'string' },
    //               },
    //             },
    //           },
    //         },
    //       },
    //       responses: {
    //         '200': {
    //           description: 'User logged in successfully',
    //         },
    //       },
    //       security: [{ JWT: [] }], // Add security requirement for JWT token
    //     },
    //   },

    //   '/forget-password': {
    //     post: {
    //       summary: 'When a user forget their password',
    //       tags: ['Auth'],
    //       requestBody: {
    //         required: true,
    //         content: {
    //           'application/json': {
    //             schema: {
    //               type: 'object',
    //               properties: {
    //                 email: { type: 'string' },
    //               },
    //             },
    //           },
    //         },
    //       },
    //       responses: {
    //         '200': {
    //           description: 'Successful operation',
    //         },
    //       },
    //     },
    //   },

    //   '/verify-otp': {
    //     post: {
    //       summary: 'Verify the otp sent to user',
    //       tags: ['Auth'],
    //       requestBody: {
    //         required: true,
    //         content: {
    //           'application/json': {
    //             schema: {
    //               type: 'object',
    //               properties: {
    //                 email: { type: 'string' },
    //                 otp: { type: 'string' },
    //               },
    //             },
    //           },
    //         },
    //       },
    //       responses: {
    //         '200': {
    //           description: 'Successful operation',
    //         },
    //       },
    //     },
    //   },

    //   '/reset-password': {
    //     post: {
    //       summary: 'Reset password',
    //       tags: ['Auth'],
    //       requestBody: {
    //         required: true,
    //         content: {
    //           'application/json': {
    //             schema: {
    //               type: 'object',
    //               properties: {
    //                 email: { type: 'string' },
    //                 newPassword: { type: 'string' },
    //                 confirmPassword: { type: 'string' },
    //               },
    //             },
    //           },
    //         },
    //       },
    //       responses: {
    //         '200': {
    //           description: 'Successful operation',
    //         },
    //       },
    //     },
    //   },
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

