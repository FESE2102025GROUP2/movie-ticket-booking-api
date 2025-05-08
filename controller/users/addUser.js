const db = require("../../models");

const addUserAndProfile = async (req, res, next) => {
    try {
        const user = req.body; // Now no need to split, take whole body
        const profile = req.body.profile; // Profile is inside the body

        // Create the user and profile together
        const userTb = await db.User.create(
            {
                ...user, // Spread all user fields
                profile: profile // Attach profile here
            },
            {
                include: [
                    {
                        model: db.Profile,
                        as: 'profile' // Must match alias in association
                    }
                ]
            }
        );

        return res.json({ message: "User and Profile created successfully!", data: userTb });
    } catch (err) {
        return res.json({ error: err.message });
    }
};

module.exports = addUserAndProfile;
