
const db = require("../../models")


const deleteUser = async (req, res, next) => {

    try {
        const id = req.params.id

        const deletedCount = await db.User.destroy({ where: { id } })

        if (deletedCount == 0) {
            throw Error("User not found!")
        }

        return res.json({ message: `${deletedCount} records have been deleted` })
    } catch (err) {
        return res.json({ error: err.message })
    }
}

module.exports = deleteUser