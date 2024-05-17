const router = require("express").Router();
const configurationController = require("../controllers/configurationController");

router.post("/", configurationController.addConfiguration);
router.get("/:id", configurationController.getConfigurationById);


module.exports = router;
