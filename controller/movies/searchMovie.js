const { Op, fn, col, where } = require("sequelize");
const db = require("../../models");

const searchMovie = async (req, res, next) => {
  const title = req.query.title;
  console.log("Search Title:", title);

  if (!title) {
    return res.status(400).json({ error: "Movie title is required" });
  }

  try {
    const movies = await db.Movie.findAll({
      where: where(
        fn('LOWER', col('title')),
        {
          [Op.like]: `%${title.toLowerCase()}%`
        }
      )
    });

    if (movies.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error searching for movies:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = searchMovie;
