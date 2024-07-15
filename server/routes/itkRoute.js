const router = require("express").Router();
const itkController = require("../controllers/itkController");

router.post("/", itkController.createItk);
router.get("/:id", itkController.getItkTasksById);
router.get("/", itkController.getAllItks);
router.delete("/:id", itkController.deleteItkById);

module.exports = router;
