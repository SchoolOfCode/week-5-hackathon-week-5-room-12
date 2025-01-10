import { pool } from "../db/index.js";

//Helper function to get all awards
export async function fetchAllAwards() {
    const result = await pool.query("SELECT * FROM awards");
    console.log(result);
    return result.rows;
}

export async function fetchAwardById(id) {
    const result = await pool.query("SELECT * FROM awards WHERE award_id=$1", [id]);
    console.log(result);
    return result.rows;
}

export async function insertAward(award_name, winner_id) {
  const result = await pool.query("INSERT INTO awards (award_name, winner_id) VALUES ($1, $2) RETURNING *", [award_name, winner_id]);
  console.log(result);
  return result.rows;
}  

export async function modifyAwardById(id, award_name, winner_id) {
  const result = await pool.query("UPDATE awards SET award_name=$1, winner_id=$2 WHERE award_id=$3 RETURNING *", [award_name, winner_id, id]);
  console.log(result);
  return result.rows;
};