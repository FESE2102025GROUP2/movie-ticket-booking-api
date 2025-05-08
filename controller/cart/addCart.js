const db = require("../../models");

const addCart = async (req, res, next) => {

    try {
        const { userId, carts } = req.body;

        const user = await db.User.findByPk(userId);

        if(!user) {
            return res.status(404).json({ error: "User not found!"});
        }

        const createdCart = await Promise.all(
            carts.map(cart => db.Cart.create({
                ...cart,
                userId: user.id
            }))
        );
        return res.json({ message: "Cart created successfully ", data: createdCart });
    } catch (err) {
        return res.json({ error: err.message });
    }
};
module.exports = addCart
