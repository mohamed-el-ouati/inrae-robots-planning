const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
require("dotenv").config();

app.use(
  cors({
    origin: [
      "http://localhost:3000", // Your frontend development URL
      "http://frontend:3000", // Your frontend URL inside the Docker network
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Add other methods you need
    allowedHeaders: ["Content-Type", "Authorization"], // Adjust headers as needed
    credentials: true, // If you need to send cookies or authorization headers
  })
);
app.use(express.json());

app.use("/robots", require("./routes/robotRoute"));
app.use("/tasks", require("./routes/taskRoute"));
app.use("/activities", require("./routes/activityRoute"));
app.use("/activity-categories", require("./routes/activityCategoryRoute"));

app.use("/equipments", require("./routes/equipmentRoute"));
app.use("/plots", require("./routes/plotRoute"));
app.use("/trajectories", require("./routes/trajectoryRoute"));
app.use("/configurations", require("./routes/configurationRoute"));
app.use("/configurations-ref", require("./routes/configurationRefRoute"));
app.use("/itks", require("./routes/itkRoute"));
app.use(
  "/robots-power-categories",
  require("./routes/robotPowerCategoryRoute")
);

app.listen(port, () => console.log(`Server has started on port: ${port}`));
