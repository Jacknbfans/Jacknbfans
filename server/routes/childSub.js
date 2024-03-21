var express = require('express');
var router = express.Router();

const cluster = require('cluster');
const numCPUs = require('os').availableParallelism;
const process = require('process');

router.get('/', async(req, res, next)=> {

try {
        process.on('message', (msg) => {
                console.log('Message from parent:', msg);
        });

        //let counter = 0;

        //setInterval(() => {
                //process.send({ counter: counter++ });
        //}, 1000);
} catch (e) {
        console.log('Ignore2 error');
    }
});


module.exports = router;