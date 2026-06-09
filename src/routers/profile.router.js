import { Router } from "express";
import { analyzer, getAllProfiles, getProfileByUsername } from "../controllers/profile.controller.js";



const router=Router();

router.route("/:username").get(getProfileByUsername).post(analyzer);
router.route("/").get(getAllProfiles);

export default router;