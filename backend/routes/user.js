//declaration des constante necessaire
const express = require('express');
const router = express.Router();

const auth =require('../middleware/auth')
const userCtrl = require('../controllers/user');//Lien avec le controlleur afin d'aller chercher le code necessaire


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/deleteUser', auth, userCtrl.deleteUser);
router.get('/getusers', userCtrl.getUsers);
router.get('/getoneuser/:id', userCtrl.getOneUser)
router.post('/updateuser/:id', userCtrl.updateUser);

module.exports = router;