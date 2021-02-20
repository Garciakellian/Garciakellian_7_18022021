// declaration des constante
const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messages'); // lien avec le controlleur afin de recuperé le code necessaire
const auth = require('../middleware/auth'); // lien avec le middleware pour l'authentification

router.post('/deletemessage', auth, messageController.deleteMessage);
router.post('/deleteresponse', auth, messageController.deleteResponse);
router.post('/postmessage', auth, messageController.postmessage);
router.get('/getonemessage/:id', messageController.getoneMessage);
router.post('/updatemessage', auth, messageController.updateMessage);
router.post('/responsemessage',auth, messageController.responseMessage);
router.get('/getmessages',  messageController.getMessages);
router.get('/getresponse/:id', messageController.getResponse);
router.get('/getallresponses', messageController.getAllResponses);


module.exports = router;