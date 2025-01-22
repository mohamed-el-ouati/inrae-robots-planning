const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();

app.use(
  cors({
    origin: [
      "http://localhost:3000", // Development URL
      "http://frontend:3000", // Frontend URL inside the Docker network
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/robots", require("./routes/robotRoute"));
app.use("/activities", require("./routes/activityRoute"));
app.use("/activity-categories", require("./routes/activityCategoryRoute"));
app.use("/equipments", require("./routes/equipmentRoute"));
app.use("/plots", require("./routes/plotRoute"));
app.use("/trajectories", require("./routes/trajectoryRoute"));
app.use("/configurations", require("./routes/configurationRoute"));
app.use("/itks", require("./routes/itkRoute"));

app.listen(port, () => console.log(`Server has started on port: ${port}`));
