const db = require("../../models")

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.userId;

        const updated = await db.Profile.update(req.body, {
            where: { userId },
        });

        res.json({ message: 'Profile updated successfully', updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = updateProfile