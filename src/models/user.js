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
            'SELECT * FROM users ORDER BY id',
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
userModel.getByName = (name, callback) => {
    if (connection) {
        console.log(name)
        connection.query(
            `SELECT * FROM users WHERE username='${name}'`,
            (err, rows) => {
                if (err) {
                    console.log(err)
                } else {
                    callback(null, rows);
                }
            }
        )
    }
};

userModel.insertUser = (userData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO users SET ?', userData,
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

userModel.updateUser = (userData, callback) => {
    if(connection){

        const sql = `
            UPDATE users SET
            username = ${connection.escape(userData.username)},
            address = ${connection.escape(userData.address)},
            municipality = ${connection.escape(userData.municipality)},
            cp = ${connection.escape(userData.cp)},
            tel = ${connection.escape(userData.tel)}
            WHERE id = ${connection.escape(userData.id)}
            
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
            SELECT * FROM users WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                    DELETE FROM users WHERE id = ${connection.escape(id)}
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