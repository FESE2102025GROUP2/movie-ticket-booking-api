const db = require("../../models");

const getCinemaWithShowtimes = async (req, res) => {
  try {
    const { cinemaId } = req.params;

    const cinema = await db.Cinema.findByPk(cinemaId, {
        include: [db.MovieShowtime]
      });

    if (!cinema) {
      return res.status(404).json({ error: "Cinema not found" });
    }

    return res.json(cinema);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getCinemaWithShowtimes;
