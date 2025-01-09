import {
    fetchAllAwards,
    fetchAwardById,
    insertAward,
} from "../models/awards.js";

export async function getAllAwards(req,res) {
    try {
        const awards = await fetchAllAwards();
        res.status(200).json({ 
            status: "success",
            data: awards
            });
        } catch (error) {
        res.status(500).json({ 
            status: "error",
            message: error.message
            });
        }
};

export async function getAwardById(req, res) {
    try {
      const id = req.params.award_id;
      const award = await fetchAwardById(id);
      if (!award) {
        return res
          .status(404)
          .json({ status: "fail", message: "Award not found" });
      }
      res.status(200).json({ status: "success", data: award });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  
export async function createAward(req, res) {
    try {
      const { award_name, winner_id } = req.body;
      if (!award_name || !winner_id) {
        return res
          .status(400)
          .json({ status: "fail", message: "Missing required fields" });
      }
      const award = await insertAward(award_name, winner_id);
      res.status(201).json({ status: "success", data: award });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }