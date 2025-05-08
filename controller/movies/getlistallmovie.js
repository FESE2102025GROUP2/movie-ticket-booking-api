const db = require('../../models'); // adjust path as needed

const getAllMovie = async (req, res) => {
  try {
    const movies = await db.Movie.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] } // optional: exclude timestamps
    });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllMovie;
