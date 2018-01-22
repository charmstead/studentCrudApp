var sqExpress = require('express');
var sqRouter = sqExpress.Router();

/* GET home page. */


sqRouter.get('/', (req, res, next) =>{

  res.render('index/index', { title: 'StudentCrudApp' });
});


module.exports = sqRouter;