const { Router } = require('express');
// import all routers;
const turnRouter = require('./Turn.js');
const nameRouter = require('./Name.js');
const resultRouter = require('./Result.js');



const router = Router();


router.use('/turn', turnRouter);
router.use('/name', nameRouter);
router.use('/result', resultRouter); 

module.exports = router;
