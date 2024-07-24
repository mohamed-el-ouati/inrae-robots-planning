const router = require("express").Router();
const equipmentController = require("../controllers/equipmentController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The equipment ID
 *         name:
 *           type: string
 *           description: The name of the equipment
 *         working_width_m:
 *           type: number
 *           description: The working width in meters
 *         trailed_or_carried:
 *           type: string
 *           description: Trailed or carried
 *         required_power_kw:
 *           type: number
 *           description: Required power in kW
 *         number_of_teeth:
 *           type: integer
 *           description: Number of teeth
 *         tooth_width_cm:
 *           type: number
 *           description: Tooth width in cm
 *         capacity_l:
 *           type: number
 *           description: Capacity in liters
 *         hitch:
 *           type: string
 *           description: Hitch type
 *         pneumatic:
 *           type: boolean
 *           description: Pneumatic or not
 *         power_take_off:
 *           type: boolean
 *           description: Power take-off or not
 *         hitch_ground_clearance:
 *           type: number
 *           description: Hitch ground clearance
 *         weight_kg:
 *           type: number
 *           description: Weight in kg
 *         image:
 *           type: string
 *           format: byte
 *           description: Image data
 *       example:
 *         id: 1
 *         name: "Plough"
 *         working_width_m: 2.5
 *         trailed_or_carried: "Trailed"
 *         required_power_kw: 50
 *         number_of_teeth: 10
 *         tooth_width_cm: 5
 *         capacity_l: 100
 *         hitch: "3-point"
 *         pneumatic: true
 *         power_take_off: true
 *         hitch_ground_clearance: 30
 *         weight_kg: 200
 *         image: null
 */

/**
 * @swagger
 * tags:
 *   name: Equipments
 *   description: Equipment management
 */

/**
 * @swagger
 * /equipments:
 *   get:
 *     summary: Get all equipments
 *     tags: [Equipments]
 *     responses:
 *       200:
 *         description: List of all equipments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 *       500:
 *         description: Server error
 */
router.get("/", equipmentController.getAllEquipments);

/**
 * @swagger
 * /equipments/available:
 *   get:
 *     summary: Get available equipments
 *     tags: [Equipments]
 *     responses:
 *       200:
 *         description: List of available equipments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: No equipments found
 *       500:
 *         description: Server error
 */
router.get("/available", equipmentController.getAvailableEquipments);

/**
 * @swagger
 * /equipments/{id}:
 *   get:
 *     summary: Get equipment by ID
 *     tags: [Equipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The equipment ID
 *     responses:
 *       200:
 *         description: Equipment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Equipment not found
 *       500:
 *         description: Server error
 */
router.get("/:id", equipmentController.getEquipmentById);

/**
 * @swagger
 * /equipments:
 *   post:
 *     summary: Create a new equipment
 *     tags: [Equipments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       201:
 *         description: Successfully added equipment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       500:
 *         description: Server error
 */
router.post("/", equipmentController.insertEquipment);

/**
 * @swagger
 * /equipments/{id}:
 *   put:
 *     summary: Update an equipment by ID
 *     tags: [Equipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The equipment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       200:
 *         description: Successfully updated equipment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipment'
 *       404:
 *         description: Equipment not found
 *       500:
 *         description: Server error
 */
router.put("/:id", equipmentController.updateEquipment);

/**
 * @swagger
 * /equipments/{id}:
 *   delete:
 *     summary: Delete an equipment by ID
 *     tags: [Equipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The equipment ID
 *     responses:
 *       200:
 *         description: Successfully deleted equipment
 *       404:
 *         description: Equipment not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", equipmentController.deleteEquipment);

module.exports = router;
