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
 *                 $ref: '#/components/schemas/ITK'
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
