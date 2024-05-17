const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/robots", require("./routes/robotRoute"));
app.use("/tasks", require("./routes/taskRoute"));
app.use("/activities", require("./routes/activityRoute"));
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
