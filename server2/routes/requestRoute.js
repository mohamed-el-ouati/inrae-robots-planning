const router = require("express").Router();
const requestController = require("../controllers/requestController");

router.get("/", requestController.getAllrequest);
module.exports = router;
                          
