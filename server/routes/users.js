var express = require('express');
var router = express.Router();
var cp = require('child_process');
var myChild = cp.fork('./childSub',{ silent:true});

/* GET users listing. */
router.get('/', function(req, res, next) {

    try {

        myChild.on('error',(err) => {
            console.log('Process error');
        });

        myChild.on('message',function(m){
            console.log('parent get message:',m);
        }); 

        myChild.send('hello',undefined,undefined,(e) => {
            if(e!=null){
                console.log('got err',e);
            }
        });

/*        myChild.on('exit', () => {
            console.log('Process exited');
            exited = true;
        });

         myChild.on('cancel-process', (event, arg) => {
            child.kill();
        });

        */
    } catch (e) {
        console.log('Ignore error');
    }


});

module.exports = router;
