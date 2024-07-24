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
 *         - id_powercat
 *       properties:
 *         id:
 *           type: integer
 *           description: The robot ID
 *         weight:
 *           type: integer
 *           description: The weight of the robot
 *         name:
 *           type: string
 *           description: The name of the robot
 *         description:
 *           type: string
 *           description: The description of the robot
 *         puissance_kwh:
 *           type: number
 *           format: float
 *           description: The power in kWh
 *         recharge_time:
 *           type: string
 *           format: duration
 *           description: The recharge time
 *         operating_time:
 *           type: string
 *           format: duration
 *           description: The operating time
 *         frontaxle_steeringspeed:
 *           type: number
 *           format: float
 *           description: The steering speed of the front axle
 *         maxangle_steering:
 *           type: number
 *           format: float
 *           description: The maximum steering angle
 *         rearaxle_steeringspeed:
 *           type: number
 *           format: float
 *           description: The steering speed of the rear axle
 *         id_powercat:
 *           type: integer
 *           description: The ID of the power category
 *         availableTill:
 *           type: string
 *           format: date
 *           description: The date until which the robot is available
 *         steering_wheel:
 *           type: integer
 *           description: The number of steering wheels
 *         driving_wheel:
 *           type: integer
 *           description: The number of driving wheels
 *         dim_length:
 *           type: number
 *           format: float
 *           description: The length dimension
 *         dim_width:
 *           type: number
 *           format: float
 *           description: The width dimension
 *         dim_height:
 *           type: number
 *           format: float
 *           description: The height dimension
 *         image_data:
 *           type: string
 *           format: byte
 *           description: The image data of the robot
 *       example:
 *         id: 1
 *         weight: 1200
 *         name: "Robot A"
 *         description: "This is a sample robot."
 *         puissance_kwh: 10.5
 *         recharge_time: "PT1H30M"
 *         operating_time: "PT4H"
 *         frontaxle_steeringspeed: 30.0
 *         maxangle_steering: 45.0
 *         rearaxle_steeringspeed: 25.0
 *         id_powercat: 2
 *         availableTill: "2024-12-31"
 *         steering_wheel: 4
 *         driving_wheel: 4
 *         dim_length: 3.5
 *         dim_width: 1.5
 *         dim_height: 1.2
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
 *         description: The list of robots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Robot'
 */

/**
 * @swagger
 * /robots/available:
 *   get:
 *     summary: Lists all available robots
 *     tags: [Robots]
 *     responses:
 *       200:
 *         description: The list of available robots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Robot'
 */

/**
 * @swagger
 * /robots/essentials:
 *   get:
 *     summary: Lists essential info of all robots
 *     tags: [Robots]
 *     responses:
 *       200:
 *         description: The list of robots' essential info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Robot'
 */

/**
 * @swagger
 * /robots/{id}:
 *   get:
 *     summary: Get a robot by ID
 *     tags: [Robots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The robot ID
 *     responses:
 *       200:
 *         description: The robot description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Robot'
 *       404:
 *         description: The robot was not found
 */

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
 *         description: The robot was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Robot'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /robots/{id}:
 *   put:
 *     summary: Update a robot by ID
 *     tags: [Robots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The robot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Robot'
 *     responses:
 *       200:
 *         description: The robot was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Robot'
 *       404:
 *         description: The robot was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /robots/{id}:
 *   delete:
 *     summary: Delete a robot by ID
 *     tags: [Robots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The robot ID
 *     responses:
 *       200:
 *         description: The robot was successfully deleted
 *       404:
 *         description: The robot was not found
 */
router.get("/", robotController.getAllRobots);
router.get("/available", robotController.getAvailableRobots);
router.get("/essentials", robotController.getRobotsEssentialInfo);
router.get("/:id", robotController.getRobotById);
router.post("/", robotController.createRobot);
router.put("/:id", robotController.updateRobot);
router.delete("/:id", robotController.deleteRobot);

module.exports = router;
