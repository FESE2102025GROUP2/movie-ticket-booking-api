const { AsyncQueueError } = require("sequelize")
const db = require("../../models")

const deletemovieshowtime = async (req, res, next) => {
    try {
        const id = req.params.id

        const deleteMovieshowtime = await db.Moiveshowtimes.destory({ where: { id }})
        if (deleteMovieshowtime == 0){
            throw Error("MovieShowTime is not fount!")
        }
        return res.json({message: `${deleteMovieshowtime} records have been deleted`})
    } catch (err) {
        return res.json({error:  err.message})
    }
}
module.exports =  deletemovieshowtime