var express = require('express');
var router = express.Router();

const addMovieController = require("../controller/movies/addMovie")
const deleteMovieController = require("../controller/movies/delMovie")
const allmovieController = require("../controller/movies/getlistallmovie")
const getTotalMovieController = require("../controller/movies/getTotalmovie")
const getMoveDetailController = require("../controller/movies/getdetailMovie")
const updateMovieController = require('../controller/movies/updatemovieinfo')
const searchMovieController = require("../controller/movies/searchMovie");


/* GET users listing. */
router.post('/add', addMovieController);
router.post('/:id/delete', deleteMovieController);
router.get('/allmovie', allmovieController);
router.get('/totalmovie', getTotalMovieController);
router.get('/search', searchMovieController);
router.get('/:id', getMoveDetailController);
router.post('/:id/update', updateMovieController);


module.exports = router;