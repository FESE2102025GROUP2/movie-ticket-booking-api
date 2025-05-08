const db = require("../../models");

const addOrder = async (req, res, next) => {
  try {
    const { userId, paymentType, pickupTime, orders, cinemaId } = req.body;

    // 1. Validate user
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // 2. Validate cinema
    const cinema = await db.Cinema.findByPk(cinemaId);
    if (!cinema) {
      return res.status(404).json({ error: "Cinema not found!" });
    }

    // 3. Validate orders array
    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: "Orders must be a non-empty array!" });
    }

    // 4. Calculate total price
    const totalPrice = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 5. Create the order
    const newOrder = await db.Order.create({
      userId,
      cinemaId,
      totalPrice,
      paymentType,
      pickupTime,
      status: "Accepted"
    });

    // 6. Prepare order items
    const orderItems = orders.map(item => ({
      movieId: item.movieId,
      price: item.price,
      quantity: item.quantity,
      movieshowtimeId: item.movieshowtimeId,
      orderId: newOrder.id
    }));

    // 7. Bulk insert order items
    await db.OrderItem.bulkCreate(orderItems);

    // 8. Fetch complete order with related data
    const orderWithItems = await db.Order.findByPk(newOrder.id, {
      include: [
        {
          model: db.OrderItem,
          as: 'orderItems',
          include: [
            {
              model: db.MovieShowtime,
              as: 'movieShowtime',
              attributes: ['id', 'dayOfWeek', 'time', 'movieId', 'cinemaId', 'createdAt', 'updatedAt']
            }
          ]
        },
        {
          model: db.Cinema,
          as: 'cinema'
        }
      ]
    });

    return res.json({
      message: "Order created successfully!",
      order: orderWithItems
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = addOrder;
