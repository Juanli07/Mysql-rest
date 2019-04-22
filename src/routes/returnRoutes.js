
const rt = require('../models/return');

module.exports = function(app){

    app.get('/returns', (req, res) => {
        rt.getReturns((err, data) => {
          res.status(200).json(data); 
        })
    });

app.post('/returns', (req, res) => {
  const returnData  = {
    id : null,
    id_user : req.body.id_user,
    id_book : req.body.id_book,
    id_lendings : req.body.id_lendings,
    return_day : null
  };
  rt.insertReturn(returnData, (err, data) => {
    if(data && data.insertId){
      res.json({
        success : true,
        msg : 'Usuario insertado',
        data : data
        
      })
    }else{
      res.status(500).json({
        success : false,
        msg : 'error'
      })
    }
  })
});

app.put('/returns/:id', (req, res) => {
  const returnData  = {
    id : req.params.id,
    id_user : req.body.id_user,
    id_book : req.body.id_book,
    id_lendings : req.body.id_lendings,
    return_day : null
  };
  
  rt.updateReturn(returnData, (err,data) => {
     if(data && data.msg){
       res.json(data)
     }else{
       res.json({
         success : false,
         msg : 'Error'
       })
     }
  })
});

app.delete('/returns/:id', (req, res) => {
  rt.deleteReturn(req.params.id, (err, data) => {
    if(data && data.msg === 'deleted' || data.msg === 'NOT EXISTS'){
      res.json({
        success : true,
        data
      })
    }else{
      res.status(500).json({
        msg : 'ERROR'
      })
    }
  })
});
}
