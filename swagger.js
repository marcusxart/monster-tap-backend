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
    '/auth/sign-up': {
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
          201: {
            description: 'Successful operation',
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

    'auth/request-otp': {
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

    'auth/verify-otp': {
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
