const router = require("express").Router();
const equipmentController = require("../controllers/equipmentController");

router.get("/names", equipmentController.getEquipmentNames);
router.get("/available", equipmentController.getAvailableEquipments);

module.exports = router;
