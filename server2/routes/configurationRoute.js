const router = require("express").Router();
const configurationController = require("../controllers/configurationController");

router.post("/", configurationController.addConfiguration);
router.get("/:id", configurationController.getConfigurationById);
router.delete("/:id", configurationController.deleteConfigurationById);
router.delete(
  "/itk/:itk_id",
  configurationController.deleteConfigurationByItkId
);
router.get("/itk/:itk_id", configurationController.getTasksByItkId);

module.exports = router;
