const db = require('../../models');

const getUserDetail = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.User.findByPk(userId, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Profile,
          as: 'profile',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUserDetail;
