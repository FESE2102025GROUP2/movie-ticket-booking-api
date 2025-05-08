const { Model } = require("sequelize");
const db =  require("../../models")

const addcinema = async(req, res, next) => {
    try{
        const cinema = req.body
        const cinameTb = await db.Cinema.create(cinema)

        return res.json(cinameTb);
    }catch(err){
        return res.json({error: err.message})
    }
}

module.exports = addcinema