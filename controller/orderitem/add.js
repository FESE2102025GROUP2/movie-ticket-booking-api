const db = require("../../models");

const addOrder = async (req, res, next) => {
    try {
        const { userId, paymentType, pickupTime, orders } = req.body;

        // 1. Find the user
        const user = await db.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        // 2. Validate orders array
        if (!Array.isArray(orders) || orders.length === 0) {
            return res.status(400).json({ error: "Orders must be a non-empty array!" });
        }

        // 3. Calculate total price first (before creating)
        const totalPrice = orders.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // 4. Create a new order first
        const newOrder = await db.Order.create({
            userId: user.id,
            totalPrice: totalPrice,
            status: "Accepted",
            paymentType: paymentType,
            pickupTime: pickupTime
        });

        // 5. Create all order items and link them to the order and movie
        const createdOrderItems = await Promise.all(
            orders.map(item => db.OrderItem.create({
                movieId: item.movieId,    // Link to movie
                price: item.price,
                quantity: item.quantity,
                orderId: newOrder.id      // Link to order
            }))
        );

        // 6. Send response
        return res.json({
            message: "Order and OrderItems created successfully!",
            order: newOrder,
            orderItems: createdOrderItems
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

module.exports = addOrder;