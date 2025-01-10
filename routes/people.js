import express from "express";
import {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePersonById,
  deletePersonById,
} from "../controllers/people.js";

const router = express.Router();

router.get("/", getAllPeople);
router.get("/:winner_id", getPersonById);
router.post("/", createPerson);
router.patch("/:winner_id", updatePersonById);
router.delete("/:winner_id", deletePersonById);

export default router;
