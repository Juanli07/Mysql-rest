const mysql = require('mysql');

connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1431',
    database : 'biblioteca'
});

let bookModel ={};

bookModel.getBooks = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM books ORDER BY id',
            (err, rows) => {
                if(err){
                    throw err;
                }else{
                    callback(null, rows);
                }
            }
        )
    }
};

bookModel.insertBook = (bookData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO books SET ?', bookData,
            (err, result) => {
                if(err){
                    throw err;
                }else{
                    callback(null, {
                        'insertId' : result.insertId
                    })
                }
            }
        )
    }
};

bookModel.updateBook = (bookData, callback) => {
    if(connection){

        const sql = `
            UPDATE books SET
            title = ${connection.escape(bookData.title)},
            author = ${connection.escape(bookData.author)},
            editorial = ${connection.escape(bookData.editorial)},
            subject = ${connection.escape(bookData.subject)},
            price = ${connection.escape(bookData.price)}
            WHERE id = ${connection.escape(bookData.id)}
            
        `
        connection.query(sql, (err, result) => {
            if(err){
                throw err;
            }else{
                callback(null, {
                    msg : 'succces'
                });
            }
        })
        
        
        
    }
};

bookModel.deleteBook = (id, callback) => {
    if(connection){
        let sql = `
            SELECT * FROM books WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                    DELETE FROM books WHERE id = ${connection.escape(id)}
                `;
               connection.query(sql, (err, result) =>{
                    if(err){
                        throw err;
                    }else{
                        callback(null, {
                            msg : 'deleted'
                        })
                    }
               }) 
            }else{
                callback(null, {
                    msg : 'NOT EXISTS'
                })
            }
        });
    }
};


module.exports = bookModel;