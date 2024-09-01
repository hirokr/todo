const express = require('express')
const router = express.Router();

const getUser = require("../controllers/getUser")

router.route('/:id').get(getUser);

module.exports = router;