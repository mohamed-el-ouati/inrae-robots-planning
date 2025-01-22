const router = require("express").Router();
const robotPowerCategoryController = require("../controllers/robotPowerCategoryController");

router.get("/", robotPowerCategoryController.getRobotsPowerCategories);

module.exports = router;
