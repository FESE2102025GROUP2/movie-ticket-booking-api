const db = require('../../models'); // adjust the path as needed

const getTotalMovie = async (req, res) => {
  try {
    const totalMovie = await db.Movie.count();
    res.status(200).json({ total: totalMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTotalMovie;
