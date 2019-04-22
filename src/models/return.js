const mysql = require('mysql');

connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1431',
    database : 'library'
});

let returnModel = {};

returnModel.getReturns = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM returns ORDER BY id',
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

returnModel.insertReturn = (returnData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO returns SET ?', returnData,
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

returnModel.updateReturn = (returnData, callback) => {
    if(connection){

        const sql = `
            UPDATE returns SET
            id_user = ${connection.escape(returnData.id_user)},
            id_book = ${connection.escape(returnData.id_book)},
            id_lendings = ${connection.escape(returnData.id_lendings)}
            WHERE id = ${connection.escape(returnData.id)}
            
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

returnModel.deleteReturn = (id, callback) => {
    if(connection){
        let sql = `
            SELECT * FROM returns WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                    DELETE FROM returns WHERE id = ${connection.escape(id)}
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

module.exports = returnModel;