var express = require('express');
var router = express.Router();

router.post('/', async(req, res)=> {
    try {
        console.log('this is ok');
        res.status(200).send("success connect qps");
    } catch (error) {
        console.log('this is error');
        res.status(500).send(`not able to connect to qps: ${error}`);
    }


});

module.exports = router;
