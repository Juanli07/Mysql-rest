const book = require('../models/books');

module.exports = function(app){

    app.get('/books', (req, res) => {
        book.getBooks((err, data) => {
          res.status(200).json(data); 
        })
});

app.get('/books/:title', (req, res) => {
  var title = req.params.title
  book.getByTitle(title, (err, data) => {
    res.status(200).json(data); 
  })
});

app.post('/books', (req, res) => {
    const bookData = {
    id : null,
    title : req.body.title,
    author : req.body.author,
    editorial : req.body.editorial,
    subject : req.body.subject,
    acquisition : null,
    price : req.body.price
    };
    book.insertBook(bookData, (err, data) => {
        if(data && data.insertId){
            res.json({
                success : true,
                msg : 'Usuario Insertado',
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

app.put('/books/:id', (req, res) => {
    const bookData = {
        id : req.params.id,
        title : req.body.title,
        author : req.body.author,
        editorial : req.body.editorial,
        subject : req.body.subject,
        acquisition : null,
        price : req.body.price
        };
    
    book.updateBook(bookData, (err,data) => {
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

  app.delete('/books/:id', (req, res) => {
    book.deleteBook(req.params.id, (err, data) => {
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