const db = require("../../models");

const addActivitylog = async (req, res, next) => {

    try {
        const { userId, activityLogs } = req.body;

        const user = await db.User.findByPk(userId);

        if(!user) {
            return res.status(404).json({ error: "User not found!"});
        }

        const createdActivitylog = await Promise.all(
            activityLogs.map(activitylog => db.ActivityLog.create({
                ...activitylog,
                userId: user.id
            }))
        );
        return res.json({ message: "Activitylog created successfully ", data: createdActivitylog });
    } catch (err) {
        return res.json({ error: err.message });
    }
};
module.exports = addActivitylog
