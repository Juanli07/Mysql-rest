const duser = require('../models/duser');

module.exports = function(app){

    app.get('/dusers', (req, res) => {
        duser.getUsers((err, data) => {
          res.status(200).json(data); 
        })
    });

app.post('/dusers', (req, res) => {
  const duserData  = {
    id : null,
    id_user : req.body.id_user,
    id_lendings : req.body.id_lendings
  };
  duser.insertUser(duserData, (err, data) => {
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

app.put('/dusers/:id', (req, res) => {
    const duserData  = {
        id : req.params.id,
        id_user : req.body.id_user,
        id_lendings : req.body.id_lendings
      };
  duser.updateUser(duserData, (err,data) => {
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

app.delete('/dusers/:id', (req, res) => {
  duser.deleteUser(req.params.id, (err, data) => {
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
