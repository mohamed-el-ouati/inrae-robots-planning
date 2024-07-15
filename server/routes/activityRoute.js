const router = require("express").Router();
const activityController = require("../controllers/activityController");

router.get("/", activityController.getAllActivities);
router.get("/infos", activityController.getAllActivitiesInfos);
router.get(
  "/category/:category_id",
  activityController.getActivitiesByCategoryId
);
router.get("/names", activityController.getActivitiesNames);
router.get("/available", activityController.getAvailableActivities);
router.post("/", activityController.insertActivity);
router.delete("/:id", activityController.deleteActivity);
module.exports = router;
