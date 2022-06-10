const sql = require('mssql')

const config = {
    server: "localhost",
    // port: 1434,
    // driver: "msnodesqlv8",
    user: "root",
    password: "root",
    database: "practiceDB",
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    }
}
const pool = new sql.ConnectionPool(config);

// const connect = async () => {
//     if (!pool) {
//         pool = new sql.ConnectionPool(config);
//     }
//     if (!pool.connected) {
//         await pool.connect();
//     }
// };

module.exports = {
    pool
}
