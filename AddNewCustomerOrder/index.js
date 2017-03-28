module.exports = function (context, req) {

    context.log('Add/update a single customer and order');

     var mysql = require('mysql');
     var customerId;
     var orderId;

      var connection = mysql.createConnection(
     {
         host     : '10.1.0.4',
         user     : 'root',
         password : 'MiniCAD123',
         database : 'mysql',
     }
 );


    var queryString = 'SELECT * FROM customers where emailAddress = ' + '"' + req.body.emailAddress + '"';
    context.log(queryString);

    connection.query(queryString, function (err, rows, fields) {
    if (err) throw err;
    

        if (rows.length == 0)
        {
            context.log('Customer does not exist');
            queryString = 'INSERT INTO customers (emailAddress, preferredLanguage) VALUES (' + '"' + req.body.emailAddress + '",' + '"' + req.body.preferredLanguage + '")';
            connection.query(queryString, function (err, rows, fields){
            customerId = rows.insertId;    
            if (err) throw err;

                queryString = 'INSERT INTO orders (customerId, product, total) VALUES (' + '"' + rows.insertId + '",' + '"' + req.body.product + '",' + '"' + req.body.total + '")';
                connection.query(queryString, function (err, rows, fields) {
                    if (err) throw err;
                    orderId = rows.insertId;

                    res = {
                        body: {"customerId": customerId, "orderId": orderId}
                    }; 
                });
            });

        }
        else
        {
            context.log('Customer found and will be updated');
            customerId = rows[0].customerId;
            var queryString = 'UPDATE customers SET preferredLanguage = ' + '"' + req.body.preferredLanguage + '"' + ' where emailAddress = ' + '"' + req.body.emailAddress + '"';
            connection.query(queryString, function (err, rows, fields){
            if (err) throw err;
                context.log(customerId);
                queryString = 'INSERT INTO orders (customerId, product, total) VALUES (' + '"' + customerId + '",' + '"' + req.body.product + '",' + '"' + req.body.total + '")';
                connection.query(queryString, function (err, rows, fields) {
                    if (err) throw err;
                    orderId = rows.insertId;

                    res = {
                        body: {"customerId": customerId, "orderId": orderId}
                    }; 

                });
            });
        }
    });

  
             
   context.done(null, res);
};