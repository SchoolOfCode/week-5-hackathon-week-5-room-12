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
          year_won INT NOT NULL    
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
        ('Marie', 'Curie', 'Physicist/Chemist', 1903),
        ('Albert', 'Einstein', 'Physicist', 1921),
        ('Frédéric', 'Joliot-Curie', 'Physicist/Chemist', 1935),
        ('Marie', 'Sklodowska-Curie', 'Chemist', 1911),
        ('Linus', 'Pauling', 'Chemist', 1954),
        ('Martin', 'Luther King Jr.', 'Activist', 1964),
        ('Gabriel', 'García Márquez', 'Author', 1982),
        ('Albert', 'Schweitzer', 'Philosopher/Physician', 1952),
        ('Dorothy', 'Hodgkin', 'Chemist', 1964),
        ('William', 'Kaelin Jr.', 'Physicist/Physiologist', 2019);
    `);

    // Seed the awards table
    //The paramaterized section pulls the winner_id from the people table when people is populated by the previous function
    await pool.query(`
      INSERT INTO awards (award_name, winner_id)
      VALUES 
        ('Nobel Prize: Physics', (SELECT winner_id FROM people WHERE firstname = 'Marie' AND surname = 'Curie' AND year_won = 1903)),
        ('Nobel Prize: Chemistry', (SELECT winner_id FROM people WHERE firstname = 'Frédéric' AND surname = 'Joliot-Curie' AND year_won = 1935)),
        ('Nobel Prize: Medicine', (SELECT winner_id FROM people WHERE firstname = 'William' AND surname = 'Kaelin Jr.' AND year_won = 2019)),
        ('Nobel Prize: Literature', (SELECT winner_id FROM people WHERE firstname = 'Gabriel' AND surname = 'García Márquez' AND year_won = 1982)),
        ('Nobel Prize: Peace', (SELECT winner_id FROM people WHERE firstname = 'Martin' AND surname = 'Luther King Jr.' AND year_won = 1964)),
        ('Nobel Prize: Economic Sciences', (SELECT winner_id FROM people WHERE firstname = 'Linus' AND surname = 'Pauling' AND year_won = 1954)),
        ('Nobel Prize: Physics', (SELECT winner_id FROM people WHERE firstname = 'Albert' AND surname = 'Einstein' AND year_won = 1921)),
        ('Nobel Prize: Chemistry', (SELECT winner_id FROM people WHERE firstname = 'Marie' AND surname = 'Sklodowska-Curie' AND year_won = 1911)),
        ('Nobel Prize: Medicine', (SELECT winner_id FROM people WHERE firstname = 'Dorothy' AND surname = 'Hodgkin' AND year_won = 1964)),
        ('Nobel Prize: Peace', (SELECT winner_id FROM people WHERE firstname = 'Albert' AND surname = 'Schweitzer' AND year_won = 1952));
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
