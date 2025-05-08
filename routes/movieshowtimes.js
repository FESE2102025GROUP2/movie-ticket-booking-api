var express = require('express');
var router = express.Router();

const addMovieShowTimeController = require("../controller/movieshowtimes/addShowtime")
const deleteMovieShowTimeController = require("../controller/movieshowtimes/deleteShowtime")
/* GET users listing. */
router.post('/add', addMovieShowTimeController);
router.post('/:id/delete', deleteMovieShowTimeController);

module.exports = router;