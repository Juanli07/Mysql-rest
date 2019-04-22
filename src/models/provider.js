const mysql = require('mysql');

connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1431',
    database : 'library'
});

let providerModel = {};

providerModel.getProviders = (callback) => {
    if(connection){
        connection.query(
            'SELECT * FROM providers ORDER BY id',
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

providerModel.insertProvider = (providerData, callback) => {
    if(connection){
        connection.query(
            'INSERT INTO providers SET ?', providerData,
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

providerModel.updateProvider = (providerData, callback) => {
    if(connection){

        const sql = `
            UPDATE providers SET
            id_book = ${connection.escape(providerData.id_book)},
            name = ${connection.escape(providerData.name)},
            address = ${connection.escape(providerData.address)},
            tel = ${connection.escape(providerData.tel)},
            website = ${connection.escape(providerData.website)}
            WHERE id = ${connection.escape(providerData.id)}
            
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

providerModel.deleteProvider = (id, callback) => {
    if(connection){
        let sql = `
            SELECT * FROM providers WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if(row){
                let sql = `
                    DELETE FROM providers WHERE id = ${connection.escape(id)}
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

module.exports = providerModel;