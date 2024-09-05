const router = require("express").Router();
const alertController = require("../controllers/alertController");


router.get("/", alertController.getAllAlerts);
module.exports=router;
