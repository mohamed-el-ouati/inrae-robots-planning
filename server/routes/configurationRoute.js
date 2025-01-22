const router = require("express").Router();
const configurationController = require("../controllers/configurationController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Configuration:
 *       type: object
 *       required:
 *         - id
 *         - robot_id
 *         - activity_id
 *         - start_date
 *         - end_date
 *       properties:
 *         id:
 *           type: integer
 *           description: The configuration ID
 *         robot_id:
 *           type: integer
 *           description: The ID of the robot
 *         activity_id:
 *           type: integer
 *           description: The ID of the activity
 *         equipment_id:
 *           type: integer
 *           description: The ID of the equipment
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: The start date of the configuration
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: The end date of the configuration
 *         plot_id:
 *           type: integer
 *           description: The ID of the plot
 *         itk_id:
 *           type: integer
 *           description: The ID of the ITK
 *         trajectory_id:
 *           type: integer
 *           description: The ID of the trajectory
 *         robot_name:
 *           type: string
 *           description: The name of the robot
 *         activity_name:
 *           type: string
 *           description: The name of the activity
 *         plot_name:
 *           type: string
 *           description: The name of the plot
 *         itk_name:
 *           type: string
 *           description: The name of the ITK
 *       example:
 *         id: 1
 *         robot_id: 101
 *         activity_id: 202
 *         equipment_id: 303
 *         start_date: "2024-08-01T00:00:00Z"
 *         end_date: "2024-08-02T00:00:00Z"
 *         plot_id: 404
 *         itk_id: 505
 *         trajectory_id: 606
 *         robot_name: "Robot X"
 *         activity_name: "Inspection"
 *         plot_name: "Plot A"
 *         itk_name: "ITK 1"
 */

/**
 * @swagger
 * tags:
 *   name: Configurations
 *   description: Task management
 */

/**
 * @swagger
 * /configurations:
 *   get:
 *     summary: Get all configurations
 *     tags: [Configurations]
 *     responses:
 *       200:
 *         description: Returns a list of all configurations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuration'
 *       404:
 *         description: No configurations found
 */
router.get("/", configurationController.getAllConfigurations);

/**
 * @swagger
 * /configurations:
 *   post:
 *     summary: Add a new configuration
 *     tags: [Configurations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Configuration'
 *     responses:
 *       200:
 *         description: Configuration successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Configuration'
 *       500:
 *         description: Internal server error
 */
router.post("/", configurationController.addConfiguration);

/**
 * @swagger
 * /configurations/{id}:
 *   get:
 *     summary: Get a configuration by ID
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the configuration to retrieve
 *     responses:
 *       200:
 *         description: Returns the configuration with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Configuration'
 *       404:
 *         description: Configuration not found
 */
router.get("/:id", configurationController.getConfigurationById);

/**
 * @swagger
 * /configurations/{id}:
 *   put:
 *     summary: Update a configuration by ID
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the configuration to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Configuration'
 *     responses:
 *       200:
 *         description: Configuration successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Configuration'
 *       400:
 *         description: Bad request due to missing fields or invalid data
 *       404:
 *         description: Configuration not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", configurationController.updateConfiguration);

/**
 * @swagger
 * /configurations/{id}:
 *   delete:
 *     summary: Delete a configuration by ID
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the configuration to delete
 *     responses:
 *       200:
 *         description: Configuration successfully deleted
 *       404:
 *         description: Configuration not found
 */
router.delete("/:id", configurationController.deleteConfigurationById);

/**
 * @swagger
 * /configurations/itk/{itk_id}:
 *   delete:
 *     summary: Delete configurations by ITK ID
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: itk_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ITK ID to delete configurations by
 *     responses:
 *       200:
 *         description: Configurations successfully deleted
 *       404:
 *         description: Configurations not found
 */
router.delete(
  "/itk/:itk_id",
  configurationController.deleteConfigurationByItkId
);

/**
 * @swagger
 * /configurations/itk/{itk_id}:
 *   get:
 *     summary: Get tasks by ITK ID
 *     tags: [Configurations]
 *     parameters:
 *       - in: path
 *         name: itk_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ITK ID to retrieve tasks for
 *     responses:
 *       200:
 *         description: Returns tasks associated with the ITK ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   configuration_id:
 *                     type: integer
 *                     description: The ID of the configuration
 *                 example:
 *                   configuration_id: 1
 *       404:
 *         description: No tasks found for the specified ITK ID
 */
router.get("/itk/:itk_id", configurationController.getTasksByItkId);

module.exports = router;
