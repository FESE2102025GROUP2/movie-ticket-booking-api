const db = require("../../models");

const updateMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const updatedData = req.body;

    // Check if user exists
    const movie = await db.Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Perform the update
    const [updateCount] = await db.Movie.update(updatedData, {
      where: { id: movieId }
    });

    if (updateCount === 0) {
      return res.status(400).json({ message: "No changes were made" });
    }

    return res.json({ message: `${updateCount} record(s) updated` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = updateMovie;
