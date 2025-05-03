import express from "express"
import { login,register,logout} from "../controllers/user.controller.js";




const router = express.Router();

router.route("/signup").post(register);
router.route("/login").post(login)
router.route("/logout").get(logout); 






export default router;