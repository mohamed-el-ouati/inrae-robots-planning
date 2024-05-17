const router = require("express").Router();
const activityController = require("../controllers/activityController");

router.get("/names", activityController.getActivitiesNames);
router.get("/available", activityController.getAvailableActivities);

module.exports = router;
