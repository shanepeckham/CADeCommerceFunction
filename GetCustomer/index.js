module.exports = function (context, req) {
    context.log('Retrieving a single customer');

     var mysql = require('mysql');

      var connection = mysql.createConnection(
     {
         host     : '10.1.0.4',
         user     : 'root',
         password : 'MiniCAD123',
         database : 'mysql',
     }
 );

 var queryString = 'SELECT * FROM customers where customerId = ' + '"' + req.body.customerId + '"';
             context.log(queryString);
             connection.query(queryString, function (err, rows, fields) {
                 if (err) throw err;

                 for (var i = 0; i < rows.length; i++) {
                     context.log(rows[i]);
                     res = {
                         body: rows[i]
                     };
                }
             });
             
    context.done(null, res);
};