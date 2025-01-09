import express from "express";
import {
  getPeople,
  getPersonById,
  createPerson,
  updatePersonById,
  deletePersonById,
} from "../controllers/people.js";

const router = express.Router();

router.get("/", getPeople);
router.get("/:winner_id", getPersonById);
router.post("/", createPerson);
router.patch("/:winner_id", updatePersonById);
router.delete("/:winner_id", deletePersonById);

export default router;