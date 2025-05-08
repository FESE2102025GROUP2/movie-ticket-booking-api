const { Op, Sequelize } = require("sequelize");
const db = require("../../models");

const searchUser = async (req, res) => {
  const { keyword } = req.query; // Get the search keyword from the query parameters

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" }); // Return error if no keyword is provided
  }

  const trimmedKeyword = keyword.trim(); // Remove leading/trailing spaces

  console.log("Searching for:", trimmedKeyword);  // Log for debugging

  try {
    const users = await db.User.findAll({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('name')), // Ensure case-insensitive search
        {
          [Op.like]: `%${trimmedKeyword.toLowerCase()}%` // Convert keyword to lowercase
        }
      ),
      attributes: { exclude: ['password'] },
      logging: console.log // Log the raw SQL query for debugging
    });

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" }); // Handle empty result
    }

    console.log("Users found:", users);  // Log the result
    res.status(200).json(users);
  } catch (error) {
    console.log("Error occurred:", error.message);  // Log any errors
    res.status(500).json({ error: error.message });
  }
};

module.exports = searchUser;
