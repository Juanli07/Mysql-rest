const provider = require('../models/provider');

module.exports = function(app){

    app.get('/providers', (req, res) => {
        provider.getProviders((err, data) => {
          res.status(200).json(data); 
        })
    });
    app.get('/providers/:name', (req, res) => {
      var name = req.params.name
      provider.getByName(name, (err, data) => {
        res.status(200).json(data); 
      })
    });

app.post('/providers', (req, res) => {
  const providerData  = {
    id : null,
    id_book : req.body.id_book,
    name : req.body.name,
    address : req.body.address,
    tel : req.body.tel,
    website : req.body.website
  };
  provider.insertProvider(providerData, (err, data) => {
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

app.put('/providers/:id', (req, res) => {
    const providerData  = {
        id : req.params.id,
        id_book : req.body.id_book,
        name : req.body.name,
        address : req.body.address,
        tel : req.body.tel,
        website : req.body.website
      };
  
  provider.updateProvider(providerData, (err,data) => {
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

app.delete('/providers/:id', (req, res) => {
  provider.deleteProvider(req.params.id, (err, data) => {
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


