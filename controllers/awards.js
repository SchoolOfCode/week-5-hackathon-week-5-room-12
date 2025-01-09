import {
    fetchAllAwards,
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