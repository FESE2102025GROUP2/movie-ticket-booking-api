var express = require('express');
var router = express.Router();

const addCinemaController = require("../controller/cinema/addCinema")
const deleteCinemaController = require("../controller/cinema/deleteCinema")
const getCinemawithShowtimeController = require("../controller/cinema/getcinamewithshowtime")
const getAllCinemaController = require("../controller/cinema/getallcinema")
const searchCinemaController = require("../controller/cinema/searchCinema")
const updateCinemaController = require("../controller/cinema/updateCinemaInfo")
/* GET users listing. */
router.post('/add', addCinemaController);
router.get('/allcinema', getAllCinemaController);
router.get('/search', searchCinemaController);
router.post('/:id/delete', deleteCinemaController);
router.get('/:cinemaId', getCinemawithShowtimeController);
router.post('/:id/update', updateCinemaController);


module.exports = router;