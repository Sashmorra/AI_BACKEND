import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpecs = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Backend",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      }
    }
  },
  apis: ["./src/routes/*.ts"],
})

export { swaggerSpecs };
