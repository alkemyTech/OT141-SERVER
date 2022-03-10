const path = require('path');

const configSwagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ONG API',
      description: 'This api allows to handle user authentications.',
      contact: {
        name: 'Emanuel',
        email: 'emanuelarroyodev@gmail.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Server Local',
      },
    ],
    externalDocs: {
      description: 'API on the SwaggerHub server',
      url: 'https://app.swaggerhub.com/apis-docs/ong-somos-mas/ApiONG/1.0.0',
    },
  },
  apis: [`${path.join(__dirname, '../documentation/*.yml')}`],
};
module.exports = { configSwagger };
