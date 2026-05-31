const fs = require('fs');
const path = require('path');

// Read the Postman collection
const collectionPath = path.join(
  __dirname,
  'E-commerce.postman_collection.json'
);
const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));

// Create a basic OpenAPI structure
const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: collection.info.name,
    description: collection.info.description,
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local server',
    },
  ],
  paths: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Helper function to convert Postman requests to OpenAPI paths
function convertRequestToPath(item) {
  if (!item.request || !item.request.url) return null;

  const path = item.request.url.path.join('/');
  const method = item.request.method.toLowerCase();
  const description = item.request.description || item.name;

  return {
    path,
    method,
    description,
  };
}

// Process all items in the collection
function processItems(items, basePath = '') {
  for (const item of items) {
    if (item.item) {
      // This is a folder, process its items
      processItems(item.item, basePath + (item.name ? `${item.name}/` : ''));
    } else {
      // This is a request
      const requestInfo = convertRequestToPath(item);
      if (requestInfo) {
        const fullPath = `/api/v1/${basePath}${requestInfo.path}`;

        if (!openApiSpec.paths[fullPath]) {
          openApiSpec.paths[fullPath] = {};
        }

        openApiSpec.paths[fullPath][requestInfo.method] = {
          summary: requestInfo.description,
          responses: {
            200: {
              description: 'Success',
            },
          },
        };
      }
    }
  }
}

// Process the collection
processItems(collection.item);

// Write the OpenAPI spec to a file
const outputPath = path.join(__dirname, 'openapi.yaml');
const yaml = require('js-yaml');
fs.writeFileSync(outputPath, yaml.dump(openApiSpec));

console.log(`OpenAPI specification created at: ${outputPath}`);
