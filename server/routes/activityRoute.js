const router = require("express").Router();
const activityController = require("../controllers/activityController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The activity ID
 *         name:
 *           type: string
 *           description: The name of the activity
 *         category_id:
 *           type: integer
 *           description: The ID of the activity's category
 *       example:
 *           id: 18,
 *           name: Désherbage mécanique,
 *           category: Lutte contre les adventices
 */

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Activity management
 */

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Get all activities
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: List of all activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Server error
 */
router.get("/", activityController.getAllActivities);

/**
 * @swagger
 * /activities/category/{category_id}:
 *   get:
 *     summary: Get activities by category ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: List of activities in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       404:
 *         description: No activities found for this category
 *       500:
 *         description: Server error
 */
router.get(
  "/category/:category_id",
  activityController.getActivitiesByCategoryId
);

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       201:
 *         description: Successfully added activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Server error
 */
router.post("/", activityController.insertActivity);

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     summary: Delete an activity by ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The activity ID
 *     responses:
 *       200:
 *         description: Successfully deleted activity
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", activityController.deleteActivity);

module.exports = router;
