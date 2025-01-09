import { pool } from "../db/index.js";

//Helper function to get all awards
export async function fetchAllAwards() {
    const result = await pool.query("SELECT * FROM awards");
    console.log(result);
    return result.rows;
}