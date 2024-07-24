const router = require("express").Router();
const plotController = require("../controllers/plotController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Plot:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The plot ID
 *         name:
 *           type: string
 *           description: The name of the plot
 *         geom:
 *           type: string
 *           description: The geometry of the plot
 *         PointEntry:
 *           type: string
 *           description: The point entry of the plot
 *         farm_id:
 *           type: integer
 *           description: The ID of the farm this plot belongs to
 *         cog:
 *           type: string
 *           description: COG text
 *       example:
 *         id: 1
 *         name: "Plot A"
 *         geom: "GEOMETRYDATA"
 *         PointEntry: "(10, 20)"
 *         farm_id: 1
 *         cog: "COG text"
 */

/**
 * @swagger
 * tags:
 *   name: Plots
 *   description: Plot management
 */

/**
 * @swagger
 * /plots:
 *   get:
 *     summary: Get all plots
 *     tags: [Plots]
 *     responses:
 *       200:
 *         description: List of all plots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plot'
 *       500:
 *         description: Server error
 */
router.get("/", plotController.getAllPlots);

/**
 * @swagger
 * /plots/names:
 *   get:
 *     summary: Get names of all plots
 *     tags: [Plots]
 *     responses:
 *       200:
 *         description: List of plot names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                 example:
 *                   id: 1
 *                   name: "Plot A"
 *       500:
 *         description: Server error
 */
router.get("/names", plotController.getPlotNames);

/**
 * @swagger
 * /plots/{id}:
 *   get:
 *     summary: Get a plot by ID
 *     tags: [Plots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The plot ID
 *     responses:
 *       200:
 *         description: A plot object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plot'
 *       404:
 *         description: Plot not found
 *       500:
 *         description: Server error
 */
router.get("/:id", plotController.getPlotById);

module.exports = router;
