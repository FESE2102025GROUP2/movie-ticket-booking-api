const { Op, Sequelize } = require("sequelize");
const db = require("../../models");

const searchCinema = async (req, res) => {
  const { keyword } = req.query; // Get the search keyword from the query parameters

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  const trimmedKeyword = keyword.trim(); // Remove leading/trailing spaces

  console.log("Searching cinema for:", trimmedKeyword);

  try {
    const cinemas = await db.Cinema.findAll({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('name')), // Case-insensitive match on name
        {
          [Op.like]: `%${trimmedKeyword.toLowerCase()}%`
        }
      ),
      logging: console.log // Optional: log the raw SQL query
    });

    if (cinemas.length === 0) {
      return res.status(404).json({ error: "Cinema not found" });
    }

    console.log("Cinemas found:", cinemas);
    res.status(200).json(cinemas);
  } catch (error) {
    console.log("Error occurred:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = searchCinema;
