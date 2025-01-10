import {
    fetchAllPeople,
    fetchPersonById,
    insertPerson,
    modifyPersonById,
} from "../models/people.js";

export async function getAllPeople(req,res) {
    try {
        const people = await fetchAllPeople();
        res.status(200).json({ 
            status: "success",
            data: people
            });
        } catch (error) {
        res.status(500).json({ 
            status: "error",
            message: error.message
            });
        }
};

export async function getPersonById(req, res) {
    try {
      const id = req.params.winner_id;
      const person = await fetchPersonById(id);
      if (!person) {
        return res
          .status(404)
          .json({ status: "fail", message: "Person not found" });
      }
      res.status(200).json({ status: "success", data: person });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

export async function createPerson(req, res) {
    try {
      const {firstname, surname, profession, year_won} = req.body;
      if (!firstname|| !surname || !profession || !year_won) {
        return res
          .status(400)
          .json({ status: "fail", message: "Missing required fields" });
      }
      const person = await insertPerson(firstname, surname, profession, year_won);
      res.status(201).json({ status: "success", data: person });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

export async function updatePersonById(req,res) {
  try {
    const id = req.params.winner_id;
    const {firstname, surname, profession, year_won} = req.body;
    if (!firstname || !surname || !profession || !year_won) {
      return res
      .status(400)
      .json({ status: "fail", message: "Missing required fields" });
      }
    const person = await modifyPersonById(id, firstname, surname, profession, year_won);
    if (!person) {
      return res
      .status(404)
      .json({ status: "fail", message: "Person not found" });
      };
    res.status(200).json({ status: "success", data: person });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};