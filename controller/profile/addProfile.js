const db = require("../../models")

const addprofile = async(req, res, next) => {
    try {
        const profile = req.body
        const profileTB = await db.Profile.create(profile)

        return res.json(profileTB);
    } catch(err) {
        return res.json({error: err.message})
    }
}

module.exports = addprofile