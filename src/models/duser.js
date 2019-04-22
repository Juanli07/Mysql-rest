const mysql = require('mysql');

connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1431',
    database : 'library'
});

let userModel = {};

userModel.getUsers = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM delinquent_user ORDER BY id',
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

userModel.insertUser = (duserData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO delinquent_user SET ?', duserData,
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

userModel.updateUser = (duserData, callback) => {
    if(connection){

        const sql = `
            UPDATE delinquent_user SET
            id_user = ${connection.escape(duserData.id_user)},
            id_lendings = ${connection.escape(duserData.id_lendings)}
            WHERE id = ${connection.escape(duserData.id)}
            
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

userModel.deleteUser = (id, callback) => {
    if(connection){
        let sql = `
            SELECT * FROM delinquent_user WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                    DELETE FROM delinquent_user WHERE id = ${connection.escape(id)}
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

module.exports = userModel;