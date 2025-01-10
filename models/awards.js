import { pool } from "../db/index.js";

//Helper function to get all awards
export async function fetchAllAwards() {
  const result = await pool.query("SELECT * FROM awards");
  console.log(result);
  return result.rows;
}

export async function fetchAwardById(id) {
  try {
    const result = await pool.query("SELECT * FROM awards WHERE award_id=$1", [
      id,
    ]);
    console.log("Query result:", result);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error in fetchAwardById:", error);
    throw error;
  }
}

export async function insertAward(award_name, winner_id) {
  try {
    const result = await pool.query(
      "INSERT INTO awards (award_name, winner_id) VALUES ($1, $2) RETURNING *",
      [award_name, winner_id]
    );
    console.log("Query result:", result);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error in createAward", error);
    throw error;
  }
}

export async function modifyAwardById(id, award_name, winner_id) {
  try {
    const result = await pool.query(
      "UPDATE awards SET award_name=$1, winner_id=$2 WHERE award_id=$3 RETURNING *",
      [award_name, winner_id, id]
    );
    console.log("Query result:", result);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error in modifyAwardById:", error);
    throw error;
  }
}

export async function removeAwardById(id) {
  try {
    const result = await pool.query(
      "DELETE FROM awards WHERE award_id=$1 RETURNING *",
      [id]
    );
    console.log("Query result:", result);
    if (result.rowCount === 0) {
      return null; // No rows were deleted
    }

    // Otherwise, return the deleted row(s)
    return result.rows[0];
  } catch (error) {
    console.error("Error in deleteAwardById:", error);
    throw error;
  }
}
