const router = require("express").Router();
const configurationRefController = require("../controllers/configurationRefController");

router.post("/", configurationRefController.addConfigurationRef);
router.delete("/:id", configurationRefController.deleteConfigurationRef);

module.exports = router;
