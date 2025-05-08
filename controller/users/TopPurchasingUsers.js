const db = require("../../models");

const getTopPurchasingUsers = async (req, res) => {
  try {
    const topUsers = await db.OrderItem.findAll({
      attributes: [
        [db.sequelize.col('orders.user.id'), 'userId'], // Get user ID
        [db.sequelize.col('orders.user.name'), 'userName'], // Get user name
        [db.sequelize.fn('SUM', db.sequelize.col('OrderItem.price')), 'totalSpent'] // Sum of prices for each user
      ],
      include: [
        {
          model: db.Order,  // Include Order model
          as: 'orders',  // Match alias 'orders' from OrderItem
          attributes: [],
          include: [
            {
              model: db.User,  // Include User model
              as: 'user',  // Match alias 'user' from Order model
              attributes: [],
            }
          ]
        }
      ],
      group: ['orders.user.id', 'orders.user.name'], // Group by user ID and name
      order: [[db.sequelize.fn('SUM', db.sequelize.col('OrderItem.price')), 'DESC']], // Order by total amount spent
      limit: 10, // Limit to top 10 users
      raw: true
    });

    if (!topUsers || topUsers.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json(topUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTopPurchasingUsers;
