import {Router }from "express";
import {authController} from "../controllers/auth.controller";
import {validate} from "../middleware/validate.middleware";
import { signupSchema,loginSchema} from "../validators/auth.validator";

const router = Router();
router.post("/signup",validate(signupSchema),authController.signup);
router.post("./login",validate(loginSchema),authController.login);
export default router;