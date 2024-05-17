const router = require("express").Router();
const robotController = require("../controllers/robotController");

router.get("/", robotController.getAllRobots);
router.get("/available", robotController.getAvailableRobots);
router.get("/essentials", robotController.getRobotsEssentialInfo);
router.get("/:id", robotController.getRobotById);
router.post("/", robotController.createRobot);
router.put("/:id", robotController.updateRobot);
router.delete("/:id", robotController.deleteRobot);

module.exports = router;
