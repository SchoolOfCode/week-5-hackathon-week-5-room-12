import { pool } from "../db/index.js";

//Helper function to get all people
export async function fetchAllPeople() {
    const result = await pool.query("SELECT * from people");
    console.log(result);
    return result.rows;
}