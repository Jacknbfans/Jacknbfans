var express = require('express');
var router = express.Router();


process.on('message', (message) => {
        console.log('child receive message:', message);
        //process.send('from child');
        //process.exit(1);
});



module.exports = router;