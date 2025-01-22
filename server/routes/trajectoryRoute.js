const router = require("express").Router();
const trajectoryController = require("../controllers/trajectoryController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Trajectory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Trajectory A"
 *         plot_id:
 *           type: integer
 *           example: 1
 *         robot_id:
 *           type: integer
 *           example: 1
 *         activity_id:
 *           type: integer
 *           example: 1
 *     Point:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         point:
 *           type: string
 *           example: "0101000020E61000007B258D4F4A780B40398AD1B56A2B4740"
 *         speed:
 *           type: number
 *           format: float
 *           example: 60.5
 *         ord_id:
 *           type: integer
 *           example: 1
 *         storage_timestamp:
 *           type: string
 *           format: date-time
 *           example: "2022-12-22T00:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   - name: Trajectories
 *     description: Trajectory management
 *   - name: Points
 *     description: Points within trajectories
 */

/**
 * @swagger
 * /trajectories:
 *   get:
 *     tags:
 *       - Trajectories
 *     summary: Get all trajectories without points
 *     description: Retrieve a list of all trajectories that do not have associated points.
 *     responses:
 *       200:
 *         description: A list of trajectories without points
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trajectory'
 */
router.get("/", trajectoryController.getAllTrajectoriesWithoutPoints);

/**
 * @swagger
 * /trajectories/points:
 *   get:
 *     tags:
 *       - Points
 *     summary: Get all trajectory points
 *     description: Retrieve all trajectory points from the database.
 *     responses:
 *       200:
 *         description: A list of all trajectory points
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Point'
 */
router.get("/points", trajectoryController.getAllTrajectoriesPoints);

/**
 * @swagger
 * /trajectories/{id}:
 *   get:
 *     tags:
 *       - Trajectories
 *     summary: Get a trajectory by ID
 *     description: Retrieve a specific trajectory by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the trajectory to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Details of the specified trajectory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trajectory'
 *       404:
 *         description: Trajectory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trajectory not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.get("/:id", trajectoryController.getTrajectoryById);

/**
 * @swagger
 * /trajectories/available:
 *   get:
 *     tags:
 *       - Trajectories
 *     summary: Get available trajectories
 *     description: Retrieve a list of available trajectories based on query parameters.
 *     parameters:
 *       - name: start
 *         in: query
 *         description: The start date for filtering trajectories.
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - name: end
 *         in: query
 *         description: The end date for filtering trajectories.
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - name: plot_id
 *         in: query
 *         description: The plot ID to filter the trajectories.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of available trajectories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trajectory'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.get("/available", trajectoryController.getAvailableTrajectories);

/**
 * @swagger
 * /trajectories/points/plots/{id}:
 *   get:
 *     tags:
 *       - Points
 *     summary: Get trajectory points by plot ID
 *     description: Retrieve trajectory points for a specific plot ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the plot for which to retrieve points.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of trajectory points for the specified plot
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Point'
 *       404:
 *         description: No trajectories found for the specified plot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No trajectories found for the specified plot"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.get(
  "/points/plots/:id",
  trajectoryController.getTrajectoriesPointsByPlotId
);

/**
 * @swagger
 * /trajectories/points/trajectory/{id}:
 *   get:
 *     tags:
 *       - Points
 *     summary: Get trajectory points by trajectory ID
 *     description: Retrieve trajectory points for a specific trajectory ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the trajectory for which to retrieve points.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of trajectory points for the specified trajectory
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Point'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.get(
  "/points/trajectory/:id",
  trajectoryController.getTrajectoryPointsById
);

/**
 * @swagger
 * /trajectories/insert:
 *   post:
 *     tags:
 *       - Trajectories
 *     summary: Insert a new trajectory
 *     description: Add a new trajectory to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Trajectory"
 *               robot_id:
 *                 type: integer
 *                 example: 123
 *               activity_id:
 *                 type: integer
 *                 example: 456
 *     responses:
 *       201:
 *         description: Trajectory inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trajectory inserted successfully"
 *                 trajectory:
 *                   $ref: '#/components/schemas/Trajectory'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.post("/", trajectoryController.insertTrajectory);

/**
 * @swagger
 * /trajectories/insert-points:
 *   post:
 *     tags:
 *       - Points
 *     summary: Insert trajectory points from a file
 *     description: Add trajectory points to the database from a provided file.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               filePath:
 *                 type: string
 *                 example: "/path/to/file.json"
 *     responses:
 *       201:
 *         description: Trajectory points inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trajectory points inserted successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.post("/insert-points", trajectoryController.insertTrajectoryPoints);

/**
 * @swagger
 * /trajectories/ref/{id}:
 *   delete:
 *     tags:
 *       - Trajectories
 *     summary: Delete a trajectory reference by ID
 *     description: Remove a trajectory reference from the database by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the trajectory reference to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Trajectory reference deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trajectory Ref deleted successfully"
 *       404:
 *         description: Trajectory reference not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trajectory Ref not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.delete("/ref/:id", trajectoryController.deleteTrajectoryRef);

/**
 * @swagger
 * /trajectories/points/{id}:
 *   delete:
 *     tags:
 *       - Points
 *     summary: Delete trajectory points by ID
 *     description: Remove trajectory points from the database by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the trajectory points to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Trajectory points deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trajectory points deleted successfully"
 *       404:
 *         description: Trajectory points not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trajectory points not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.delete("/points/:id", trajectoryController.deleteTrajectoryPoints);

/**
 * @swagger
 * /trajectories/plot/{id}:
 *   get:
 *     tags:
 *       - Trajectories
 *     summary: Get the plot that contains a specific trajectory.
 *     description: Retrieve the plot that contains the given trajectory ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the trajectory for which to find the most containing plot.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Details of the plot containing the most trajectory points
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plot_id:
 *                   type: integer
 *                   example: 24
 *                 plot_name:
 *                   type: string
 *                   example: "2_3_4 PAL"
 *       404:
 *         description: Plot not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Plot not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.get("/plot/:id", trajectoryController.getPlotContainingTrajectory);

/**
 * @swagger
 * /trajectories/{id}:
 *   put:
 *     summary: Update an trajectory by ID
 *     tags: [Trajectories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The trajectory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Trajectory'
 *     responses:
 *       200:
 *         description: Successfully updated trajectroy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trajectory'
 *       404:
 *         description: Trajectory not found
 *       500:
 *         description: Server error
 */
router.put("/:id", trajectoryController.updateTrajectory);

module.exports = router;
