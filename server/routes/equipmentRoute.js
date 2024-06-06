const router = require("express").Router();
const equipmentController = require("../controllers/equipmentController");

router.get("/", equipmentController.getAllEquipments);
router.get("/names", equipmentController.getEquipmentNames);
router.get("/available", equipmentController.getAvailableEquipments);
router.get("/:id", equipmentController.getEquipmentById);
router.post("/", equipmentController.insertEquipment);
router.put("/:id", equipmentController.updateEquipment);
router.delete("/:id", equipmentController.deleteEquipment);

module.exports = router;
