var express = require('express');
var router = express.Router();

const addCartController = require("../controller/cart/addCart")

/* GET users listing. */
router.post('/add', addCartController);
// router.post('/:id/delete', deleteProfileController);
// router.post('/update/:user_id', updateProfileController);

module.exports = router;