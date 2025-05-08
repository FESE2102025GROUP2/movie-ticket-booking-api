const db = require('../../models'); // adjust path as needed

const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] } // optional: exclude timestamps
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllUsers;
