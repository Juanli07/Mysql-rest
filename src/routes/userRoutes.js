const user = require('../models/user');

module.exports = function(app){

    app.get('/users', (req, res) => {
        user.getUsers((err, data) => {
          res.status(200).json(data); 
        })
    });
    app.get('/users/:name', (req, res) => {
      var name = req.params.name
      user.getByName(name, (err, data) => {
        res.status(200).json(data); 
      })
    });

app.post('/users', (req, res) => {
  const userData  = {
    id : null,
    username : req.body.username,
    address : req.body.address,
    municipality : req.body.municipality,
    cp : req.body.cp,
    tel : req.body.tel
  };
  user.insertUser(userData, (err, data) => {
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

app.put('/users/:id', (req, res) => {
  const userData  = {
    id : req.params.id,
    username : req.body.username,
    address : req.body.address,
    municipality : req.body.municipality,
    cp : req.body.cp,
    tel : req.body.tel
  };
  
  user.updateUser(userData, (err,data) => {
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

app.delete('/users/:id', (req, res) => {
  user.deleteUser(req.params.id, (err, data) => {
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


