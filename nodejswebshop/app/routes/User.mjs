import express from "express";
const router = express.Router();
import * as controller from "../controllers/UserController.mjs"; // Import all exports as 'controller'

// Define a route with a dynamic parameter ':username'
router.get("/:username", controller.get);

export default router;
