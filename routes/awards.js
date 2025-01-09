import express from "express";
import {
  getAwards,
  getAwardById,
  createAward,
  updateAwardById,
  deleteAwardById,
} from "../controllers/awards.js";

const router = express.Router();

router.get("/", getAwards);
router.get("/:award_id", getAwardById);
router.post("/", createAward);
router.patch("/:award_id", updateAwardById);
router.delete("/:award_id", deleteAwardById);

export default router;