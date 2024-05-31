const router = require("express").Router();
const trajectoryController = require("../controllers/trajectoryController");

router.get("/", trajectoryController.getAllTrajectoriesPoints);
router.get("/list", trajectoryController.getAllTrajectoriesList);
router.get("/available", trajectoryController.getAvailableTrajectories);
router.get("/points/:id", trajectoryController.getTrajectoriesPoints);
router.get("/:id", trajectoryController.getTrajectoryById);

router.post("/insert-points", trajectoryController.insertTrajectoryPoints);
router.post("/insert-name", trajectoryController.insertTrajectoryName);
router.delete("/points/:id", trajectoryController.deleteTrajectoryPoints);
router.delete("/ref/:id", trajectoryController.deleteTrajectoryRef);

module.exports = router;
