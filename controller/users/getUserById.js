const db = require("../../models");

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log("Looking for user with ID:", userId);

    const user = await db.User.findByPk(userId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }  // Optional
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getUserById;
