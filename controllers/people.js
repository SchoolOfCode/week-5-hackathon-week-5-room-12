import {
    fetchAllPeople,
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