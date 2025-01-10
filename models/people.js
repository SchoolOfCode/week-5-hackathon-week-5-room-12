import { pool } from "../db/index.js";

//Helper function to get all people
export async function fetchAllPeople() {
  const result = await pool.query("SELECT * FROM people");
  console.log(result);
  return result.rows;
}

export async function fetchPersonById(id) {
  try {
    const result = await pool.query("SELECT * FROM people WHERE winner_id=$1", [
      id,
    ]);
    console.log("Query result:", result);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error in fetchpeopleById:", error);
    throw error;
  }
}

export async function insertPerson(firstname, surname, profession, year_won) {
  try {
    const result = await pool.query(
      "INSERT INTO people (firstname, surname, profession, year_won) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstname, surname, profession, year_won]
    );
    console.log("Query result:", result);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error in createPerson", error);
    throw error;
  }
}

export async function modifyPersonById(
  id,
  firstname,
  surname,
  profession,
  year_won
) {
  try {
    const result = await pool.query(
      "UPDATE people SET firstname=$1, surname=$2, profession=$3, year_won=$4 WHERE winner_id=$5 RETURNING *",
      [firstname, surname, profession, year_won, id]
    );
    console.log("Query result:", result);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error in modifypersonById:", error);
    throw error;
  }
}

export async function removePersonById(id) {
  try {
    const result = await pool.query(
      "DELETE FROM people WHERE winner_id=$1 RETURNING *",
      [id]
    );
    console.log("Query result:", result);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error in deletepersonById:", error);
    throw error;
  }
}
