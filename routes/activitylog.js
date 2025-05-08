var express = require('express');
var router = express.Router();

const addActivitylogController = require("../controller/activitylog/addActivitylog")

/* GET users listing. */
router.post('/add', addActivitylogController);
// router.post('/:id/delete', deleteProfileController);
// router.post('/update/:user_id', updateProfileController);

module.exports = router;