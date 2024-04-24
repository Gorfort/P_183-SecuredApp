import express from "express";
const router = express.Router();
import * as controller from "../controllers/UserController.mjs"; // correct import

router.get("/:username", controller.get);

export default router;
