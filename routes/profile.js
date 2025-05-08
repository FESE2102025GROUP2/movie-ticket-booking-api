var express = require('express');
var router = express.Router();

const addProfileController = require("../controller/profile/addProfile")
const deleteProfileController = require("../controller/profile/deleteProfile")
const updateProfileController = require("../controller/profile/updateProfile")
/* GET users listing. */
router.post('/add', addProfileController);
router.post('/:id/delete', deleteProfileController);
router.post('/update/:user_id', updateProfileController);

module.exports = router;