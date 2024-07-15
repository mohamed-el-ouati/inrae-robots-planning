const router = require("express").Router();
const configurationRefController = require("../controllers/configurationRefController");

router.post("/", configurationRefController.addConfigurationRef);
router.delete("/:id", configurationRefController.deleteConfigurationRef);
router.delete(
  "/configuration/:configuration_id",
  configurationRefController.deleteConfigurationRefByConfigurationId
);
module.exports = router;
