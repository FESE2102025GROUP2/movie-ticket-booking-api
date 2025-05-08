const db = require('../../models'); // adjust the path as needed

const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await db.User.count();
    res.status(200).json({ total: totalUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTotalUsers;
