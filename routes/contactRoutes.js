const express = require('express');
const router = express.Router();
const {getContacts,deleteContact,updateContact,getContact,createContact} =  require("../controllers/contactControllers");
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports  = router;
