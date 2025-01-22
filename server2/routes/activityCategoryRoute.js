const router = require("express").Router();
const activityCategoryController = require("../controllers/activityCategoryController");

/**
 * @swagger
 * components:
 *   schemas:
 *     ActivityCategory:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The category ID
 *         name:
 *           type: string
 *           description: The name of the category
 *       example:
 *         id: 1
 *         name: "Agriculture"
 */

/**
 * @swagger
 * tags:
 *   name: Activity Categories
 *   description: Activity category management
 */

/**
 * @swagger
 * /activity-categories:
 *   get:
 *     summary: Get all activity categories
 *     tags: [Activity Categories]
 *     responses:
 *       200:
 *         description: List of all activity categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActivityCategory'
 *       500:
 *         description: Server error
 */
router.get("/", activityCategoryController.getAllCategories);

/**
 * @swagger
 * /activity-categories:
 *   post:
 *     summary: Create a new activity category
 *     tags: [Activity Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityCategory'
 *     responses:
 *       201:
 *         description: Successfully added activity category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityCategory'
 *       500:
 *         description: Server error
 */
router.post("/", activityCategoryController.insertCategory);

/**
 * @swagger
 * /activity-categories/{id}:
 *   delete:
 *     summary: Delete an activity category by ID
 *     tags: [Activity Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Successfully deleted activity category
 *       404:
 *         description: Activity category not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", activityCategoryController.deleteCategory);

module.exports = router;
