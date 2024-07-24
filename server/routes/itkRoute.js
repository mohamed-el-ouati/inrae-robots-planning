const router = require("express").Router();
const itkController = require("../controllers/itkController");

/**
 * @swagger
 * components:
 *   schemas:
 *     ITK:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The ITK ID
 *         name:
 *           type: string
 *           description: The name of the ITK
 *       example:
 *         id: 1
 *         name: "Example ITK"
 *     ITKResponse:
 *       type: object
 *       properties:
 *         robot_name:
 *           type: string
 *         activity_name:
 *           type: string
 *         plot_name:
 *           type: string
 *         trajectory_name:
 *           type: string
 *         equipment_name:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date-time
 *         end_date:
 *           type: string
 *           format: date-time
 *         configuration_ref_id:
 *           type: integer
 *         itk_name:
 *           type: string
 *         id:
 *           type: integer
 *       example:
 *         robot_name: "Adap2e"
 *         activity_name: "Préparation du lit de semence"
 *         plot_name: "12 PAL"
 *         trajectory_name: "montoldre_rose_cc"
 *         equipment_name: "tech3"
 *         start_date: "2024-07-02T22:00:00.000Z"
 *         end_date: "2024-07-04T22:00:00.000Z"
 *         configuration_ref_id: 43
 *         itk_name: "Test ITK"
 *         id: 35
 */

/**
 * @swagger
 * tags:
 *   name: ITKs
 *   description: ITK management
 */

/**
 * @swagger
 * /itks:
 *   post:
 *     summary: Create a new ITK
 *     tags: [ITKs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ITK'
 *     responses:
 *       201:
 *         description: Successfully added ITK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ITK'
 *       500:
 *         description: Server error
 */
router.post("/", itkController.createItk);

/**
 * @swagger
 * /itks/{id}:
 *   get:
 *     summary: Get ITK tasks by ID
 *     tags: [ITKs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ITK ID
 *     responses:
 *       200:
 *         description: ITK tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ITKResponse'
 *       404:
 *         description: ITK not found
 *       500:
 *         description: Server error
 */
router.get("/:id", itkController.getItkTasksById);

/**
 * @swagger
 * /itks:
 *   get:
 *     summary: Get all ITKs
 *     tags: [ITKs]
 *     responses:
 *       200:
 *         description: List of all ITKs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ITK'
 *       500:
 *         description: Server error
 */
router.get("/", itkController.getAllItks);

/**
 * @swagger
 * /itks/{id}:
 *   delete:
 *     summary: Delete an ITK by ID
 *     tags: [ITKs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ITK ID
 *     responses:
 *       200:
 *         description: Successfully deleted ITK
 *       404:
 *         description: ITK not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", itkController.deleteItkById);

module.exports = router;
