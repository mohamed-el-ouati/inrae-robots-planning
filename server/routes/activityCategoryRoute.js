const router = require("express").Router();
const activityCategoryController = require("../controllers/activityCategoryController");

router.get("/", activityCategoryController.getAllCategories);
router.post("/", activityCategoryController.insertCategory);
router.delete("/:id", activityCategoryController.deleteCategory);

module.exports = router;
