const db = require("../../models");

const getAllCinema = async (req, res) => {
  try {
    // Fetch all cinemas without including any associations like MovieShowtime
    const cinemas = await db.Cinema.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },  // Exclude unnecessary fields
      // No 'include' block is added here, so no related data will be fetched
    });

    // Log the cinemas to check the output
    console.log(cinemas);

    // Return cinemas in the response
    res.status(200).json(cinemas);
  } catch (error) {
    // Log the error for debugging
    console.error(error);
    
    // Send a 500 error response with the error message
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllCinema;
