// controllers/user/toggleStatus.js
const db = require('../../models');

const toggleUserStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const [updated] = await db.User.update(
      { status },
      { where: { id: userId } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: 'User not found or status unchanged' });
    }

    return res.json({ message: `User status set to '${status}'` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = toggleUserStatus;
