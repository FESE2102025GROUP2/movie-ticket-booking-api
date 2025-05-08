const db = require("../../models");

const addShowtime = async (req, res, next) => {
  try {
    const { movieId, cinemaId, showtimes } = req.body;

    const movie = await db.Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found!" });
    }

    const cinema = await db.Cinema.findByPk(cinemaId);
    if (!cinema) {
      return res.status(404).json({ error: "Cinema not found!" });
    }

    if (!Array.isArray(showtimes) || showtimes.length === 0) {
      return res.status(400).json({ error: "Showtimes must be a non-empty array!" });
    }

    const createdShowtimes = await Promise.all(
      showtimes.map(showtime => {
        return db.MovieShowtime.create({
          dayOfWeek: showtime.dayOfWeek,
          time: showtime.time,
          movieId: movie.id,
          cinemaId: cinema.id
        });
      })
    );

    return res.json({
      message: "Showtimes created successfully for the movie!",
      showtimes: createdShowtimes
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = addShowtime;
