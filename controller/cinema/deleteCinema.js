const db = require("../../models")

const deleteCinema = async (req, res, next) => {
    try {
        const id = req.params.id

        const deletedCount = await db.Cinema.destroy({ where: { id }})
        if (deletedCount == 0){
            throw Error("Cinema not found!")
        }

        return res.json({message: `${deletedCount} records have been deleted`})
    } catch (err) {
        return res.json({ error: err.message })
    }
}

module.exports = deleteCinema