const db =  require("../../models")

const deleteMovie = async (req, res, next) => {
    try {
        const id = req.params.id
        
        const deleteMovie = await db.Movie.destroy({ where: { id }})
        if(deleteMovie == 0){
            throw Error("Movie not found!")
        }

        return res.json({message: `${deleteMovie} records have been deleted`})
    } catch (err) {
        return res.json({ error: err.message})
    }
}
module.exports =  deleteMovie