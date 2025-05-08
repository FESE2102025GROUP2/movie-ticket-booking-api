const db = require("../../models");

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    // Check if user exists
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Perform the update
    const [updateCount] = await db.User.update(updatedData, {
      where: { id: userId }
    });

    if (updateCount === 0) {
      return res.status(400).json({ message: "No changes were made" });
    }

    return res.json({ message: `${updateCount} record(s) updated` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = updateUser;
