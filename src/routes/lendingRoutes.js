const lending = require('../models/lending');

module.exports = function(app){

    app.get('/lendings', (req, res) => {
        lending.getLendings((err, data) => {
          res.status(200).json(data); 
        })
    });

app.post('/lendings', (req, res) => {
  const lendingData  = {
    id : null,
    id_user : req.body.id_user,
    id_book : req.body.id_book,
    retired_day : null
  };
  lending.insertLending(lendingData, (err, data) => {
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

app.put('/lendings/:id', (req, res) => {
  const lendingData  = {
    id : req.params.id,
    id_user : req.body.id_user,
    id_book : req.body.id_book,
    retired_day : req.body.retired_day
  };
  
  lending.updateLending(lendingData, (err,data) => {
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

app.delete('/lendings/:id', (req, res) => {
  lending.deleteLending(req.params.id, (err, data) => {
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