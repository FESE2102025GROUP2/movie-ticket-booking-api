var express = require('express');
var router = express.Router();

const addOrderController = require("../controller/order/addOrder")
const topMovieOrderController = require("../controller/order/topOrderMovie")
const getDailyPurchases = require("../controller/order/DailyPurchase")
const filterDateController = require("../controller/order/filterDate")


/* GET users listing. */
router.post('/add', addOrderController);
router.get('/daily-purchases', getDailyPurchases);
router.get('/by-date', filterDateController)
router.get('/top-order', topMovieOrderController);
// router.post('/:id/delete', deleteProfileController);
// router.post('/update/:user_id', updateProfileController);

module.exports = router;