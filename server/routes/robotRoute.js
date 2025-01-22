const router = require("express").Router();
const robotController = require("../controllers/robotController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Robot:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - image_data
 *       properties:
 *         id:
 *           type: integer
 *           description: The robot ID
 *         weight_kg:
 *           type: integer
 *           description: The weight of the robot in kilograms
 *         name:
 *           type: string
 *           description: The name of the robot
 *         description:
 *           type: string
 *           description: The description of the robot
 *         max_speed_mps:
 *           type: number
 *           format: float
 *           description: The maximum speed in meters per second
 *         autonomy:
 *           type: string
 *           description: The autonomy of the robot
 *         locomotion:
 *           type: string
 *           description: The locomotion type of the robot
 *         on_board_sensors:
 *           type: string
 *           description: The onboard sensors of the robot
 *         image_data:
 *           type: string
 *           format: byte
 *           description: The image data of the robot
 *       example:
 *         id: 1
 *         weight_kg: 1200
 *         name: "Robot A"
 *         description: "This is a sample robot."
 *         max_speed_mps: 10.5
 *         autonomy: "2 hours"
 *         locomotion: "Wheeled"
 *         on_board_sensors: "Camera, Lidar"
 *         image_data: "base64encodeddata"
 */

/**
 * @swagger
 * tags:
 *   name: Robots
 *   description: Robot management
 */

/**
 * @swagger
 * /robots:
 *   get:
 *     summary: Lists all the robots
 *     tags: [Robots]
 *     responses:
 *       200:
 *         description: Returns a list of all robots with their full details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Robot'
 */
router.get("/", robotController.getAllRobots);

/**
 * @swagger
 * /robots/available:
 *   get:
 *     summary: Lists all available robots
 *     tags: [Robots]
 *     parameters:
 *       - in: query
 *         name: start
 *         required: true
 *         description: Start date for availability check (ISO 8601 format).
 *         schema:
 *           type: string
 *       - in: query
 *         name: end
 *         required: true
 *         description: End date for availability check (ISO 8601 format).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a list of robots that are currently available.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Robot'
 */
router.get("/available", robotController.getAvailableRobots);

/**
 * @swagger
 * /robots/id-and-name:
 *   get:
 *     summary: Lists the ID and name of all robots
 *     tags: [Robots]
 *     responses:
 *       200:
 *         description: Returns a list of robots with only their ID and name.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The robot ID
 *                   name:
 *                     type: string
 *                     description: The name of the robot
 *                 example:
 *                   id: 1
 *                   name: "Robot A"
 */
router.get("/id-and-name", robotController.getRobotsIdAndName);

/**
 * @swagger
 * /robots/essentials:
 *   get:
 *     summary: Lists essential info of all robots
 *     tags: [Robots]
 *     responses:
 *       200:
 *         description: Returns a list of robots with only essential information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Robot'
 */
router.get("/essentials", robotController.getRobotsEssentialInfo);

/**
 * @swagger
 * /robots/{id}:
 *   get:
 *     summary: Get a robot by ID
 *     tags: [Robots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the robot to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the robot with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Robot'
 *       404:
 *         description: Robot not found with the provided ID.
 */
router.get("/:id", robotController.getRobotById);

/**
 * @swagger
 * /robots:
 *   post:
 *     summary: Create a new robot
 *     tags: [Robots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Robot'
 *     responses:
 *       201:
 *         description: The newly created robot is returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Robot'
 *       400:
 *         description: Bad request due to missing required fields.
 *       500:
 *         description: An error occurred while creating the robot.
 */
router.post("/", robotController.createRobot);

/**
 * @swagger
 * /robots/{id}:
 *   put:
 *     summary: Update a robot by ID
 *     tags: [Robots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the robot to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Robot'
 *     responses:
 *       200:
 *         description: The updated robot is returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Robot'
 *       400:
 *         description: Bad request due to missing required fields or invalid data.
 *       404:
 *         description: Robot not found with the provided ID.
 *       500:
 *         description: An error occurred while updating the robot.
 */
router.put("/:id", robotController.updateRobot);

/**
 * @swagger
 * /robots/{id}:
 *   delete:
 *     summary: Delete a robot by ID
 *     tags: [Robots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the robot to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The robot was successfully deleted.
 *       404:
 *         description: Robot not found with the provided ID.
 */
router.delete("/:id", robotController.deleteRobot);

module.exports = router;
