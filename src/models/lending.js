const mysql = require('mysql');

connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1431',
    database : 'library'
});

let lendingModel = {};

lendingModel.getLendings = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM lendings ORDER BY id',
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

lendingModel.insertLending = (lendingData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO lendings SET ?', lendingData,
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

lendingModel.updateLending = (lendingData, callback) => {
    if(connection){

        const sql = `
            UPDATE lendings SET
            id_user = ${connection.escape(lendingData.id_user)},
            id_book = ${connection.escape(lendingData.id_book)}
            WHERE id = ${connection.escape(lendingData.id)}
            
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

lendingModel.deleteLending = (id, callback) => {
    if(connection){
        let sql = `
            SELECT * FROM lendings WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                    DELETE FROM lendings WHERE id = ${connection.escape(id)}
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

module.exports = lendingModel;