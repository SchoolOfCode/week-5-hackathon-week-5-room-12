import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
      DROP TABLE IF EXISTS people CASCADE;
      DROP TABLE IF EXISTS awards CASCADE;
    `);

    // Create the people table CHECK YEAR
    // INT GENERATED creates automatically
    await pool.query(`
        CREATE TABLE people (
          winner_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          firstname VARCHAR(255) NOT NULL,
          surname VARCHAR(255) NOT NULL,
          profession VARCHAR(255) NOT NULL,
          year_won YEAR NOT NULL    
        );
      `);

    //INT REFERENCES people(winner_id) uses the winner_id from the people table as a foreign key
    await pool.query(`
        CREATE TABLE awards (
          award_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          award_name VARCHAR(255) NOT NULL,
          winner_id INT REFERENCES people(winner_id)
        );
      `);

    // Seed the people table
    await pool.query(`
        INSERT INTO people (firstname, surname, profession, year_won)
        VALUES 
          ('', '');

      `);

    // Seed the awards table
    await pool.query(`
        INSERT INTO awards (award_name, winner_id) 
        VALUES 
        ('Nobel Prize: Physics', NULL),
        ('Nobel Prize: Chemistry', NULL),
        ('Nobel Prize: Medicine', NULL),
        ('Nobel Prize: Literature', NULL),
        ('Nobel Prize: Peace', NULL),
        ('Nobel Prize: Economic Sciences', NULL),
        ('Nobel Prize: Physics', NULL),
        ('Nobel Prize: Chemistry', NULL),
        ('Nobel Prize: Medicine', NULL),
        ('Nobel Prize: Peace', NULL); 
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
