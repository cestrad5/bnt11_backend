// Import the mongoose module for database connection.
const mongoose = require("mongoose");

/**
 * Connects the application to a MongoDB database.
 * Uses the MONGO_URI environment variable for the connection URL.
 * @returns {Promise<void>} A promise indicating whether the connection was successful.
 */
const dbconnect = async () => {
  try {
    // Attempt to connect to the database using the URL provided in the environment variable.
    const connection = await mongoose.connect(process.env.MONGO_URI, {
    });

    // Get the host and port information from the established connection.
    const url = `${connection.connection.host}:${connection.connection.port}`;

    // console.log(`MongoDB connected to URL: ${url}`);
  } catch (error) {
    // In case of an error during connection, log an error message and exit the process.
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Export the dbconnect function to be used in other modules.
module.exports = dbconnect;