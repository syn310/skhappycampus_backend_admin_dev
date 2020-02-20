require('dotenv').config();

const environments = {
    development : {
      mysql: {
        username : process.env.localusername,
        password : process.env.localpassword,
        database : process.env.localdb,
        host : process.env.localhost,
        port : process.env.localport
      }
    },


    production: {
      mysql: {
        username : process.env.dbusername,
        password : process.env.dbpassword,
        database : process.env.database,
        host : process.env.dbhost,
        port : process.env.port
      }
    }
}


const nodeEnv = process.env.node_env || 'development';

module.exports = environments[nodeEnv];
