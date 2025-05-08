const db = require('../../models');

const getMovieDetail = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await db.Movie.findByPk(movieId, {
      attributes: { exclude: [ 'createdAt', 'updatedAt'] },
            include: [
              {
                model: db.MovieShowtime,
                as: 'movieShowtime',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
              }
            ]
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getMovieDetail;
