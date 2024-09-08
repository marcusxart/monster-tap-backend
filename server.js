require('dotenv').config();
const http = require('http');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const ejs = require('ejs');

const app = require('./src/app');
const db = require('./src/database/models');
const { initSocket } = require('./src/socket');

const PORT = process.env.PORT;
const server = http.createServer(app);
const swaggerDefinition = require('./swagger');

// Swagger Setup
const routeFolderPath = path.join(__dirname, '..', 'src', 'routes');
const options = {
  swaggerDefinition,
  apis: [path.join(routeFolderPath, '*.js')],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.set('view engine', 'ejs');

// Set the directory for the EJS templates
app.set('views', path.join(__dirname, 'templates'));

db.sequelize.sync({ alter: true }).then(() => {
  initSocket(server);
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
