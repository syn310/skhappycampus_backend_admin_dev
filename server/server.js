var app = require('../app');
const config = require('../config/environments');
require('dotenv').config();
var port = config.mysql.port;
const syncDatabase = require('../bin/sync-database');

app.listen(port, () => {
    console.log('Example app listening on port : ' + port) ;

    syncDatabase().then(() => {
   console.log('Database sync');
    })

});
