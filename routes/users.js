var express = require('express');
var router = express.Router();

const addUserController = require("../controller/users/addUser")
const deleteUserController = require("../controller/users/deleteUser")
const listallUserController = require("../controller/users/listallUser")
const totalUserControler = require("../controller/users/totalUser")
const userDetailController = require("../controller/users/getUserdetail")
const userUpdateController = require("../controller/users/updateUser")
const toggleUserAccessController = require("../controller/users/toggleaccess")
const searchUserController = require("../controller/users/search")
const topUserPurchasingController = require("../controller/users/TopPurchasingUsers")
const searchMovieCinemaController = require("../controller/users/userSearchMC")
// REMOVE one of the getUserById controllers if both do the same thing

/* Route definitions in correct order */
router.post('/add', addUserController);
router.post('/:id/delete', deleteUserController);
router.get('/list', listallUserController);
router.get('/total', totalUserControler);
router.post('/toggleaccess', toggleUserAccessController);
router.get('/searchs', searchMovieCinemaController);
router.get('/search', searchUserController); // <-- Put before dynamic routes
router.get('/top-purchasing', topUserPurchasingController);
router.post('/:id/update', userUpdateController);
router.get('/:id', userDetailController); // <-- Keep only one if they’re duplicates

module.exports = router;
