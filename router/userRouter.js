import { Router } from "express";
import { getCurrentUser, getUserRole } from "../controllers/userController.js";
import { validateUser } from "../Middleware/authmiddleware.js";

const router = Router();

router.get("/current-user", validateUser, getCurrentUser);
router.get("/:email", getUserRole);

export default router;
