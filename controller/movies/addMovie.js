const { Model } = require("sequelize");
const db =  require("../../models");

const addmovie = async(req, res, next) => {
    try {
        const movie = req.body
        const movieTb = await db.Movie.create(movie)
        return res.json(movieTb);
    }catch(err){
        return res.json({error: err.message})
    }
}
module.exports = addmovie