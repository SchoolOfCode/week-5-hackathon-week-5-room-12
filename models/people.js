import { pool } from "../db/index.js";

//Helper function to get all people
export async function fetchAllPeople() {
    const result = await pool.query("SELECT * FROM people");
    console.log(result);
    return result.rows;
}

export async function fetchPersonById(id) {
    const result = await pool.query("SELECT * FROM people WHERE winner_id=$1", [id]);
    console.log(result);
    return result.rows;
  }

export async function insertPerson(firstname, surname, profession, year_won) {
    const result = await pool.query("INSERT INTO people (firstname, surname, profession, year_won) VALUES ($1, $2, $3, $4) RETURNING *", [firstname, surname, profession, year_won]);
    console.log(result);
    return result.rows;
}

export async function modifyPersonById(id, firstname, surname, profession, year_won) {
    const result = await pool.query("UPDATE people SET firstname=$1, surname=$2, profession=$3, year_won=$4 WHERE winner_id=$5 RETURNING *", [firstname, surname, profession, year_won, id]);
    console.log(result);
    return result.rows;
}