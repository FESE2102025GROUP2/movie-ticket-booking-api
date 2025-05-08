const { Op, Sequelize } = require("sequelize");
const db = require("../../models");

const searchByName = async (req, res) => {
  const { keyword, type } = req.query;

  if (!keyword || !type) {
    return res.status(400).json({ error: "Both 'keyword' and 'type' are required." });
  }

  const trimmedKeyword = keyword.trim().toLowerCase();

  let model, modelName;

  if (type.toLowerCase() === "cinema") {
    model = db.Cinema;
    modelName = "Cinema";
  } else if (type.toLowerCase() === "movie") {
    model = db.Movie;
    modelName = "Movie";
  } else {
    return res.status(400).json({ error: "Invalid type. Use 'cinema' or 'movie'." });
  }

  try {
    const results = await model.findAll({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("name")),
        {
          [Op.like]: `%${trimmedKeyword}%`
        }
      ),
      logging: console.log
    });

    if (results.length === 0) {
      return res.status(404).json({ error: `${modelName} not found` });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = searchByName;
