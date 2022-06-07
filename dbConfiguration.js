const sql = require('mssql/msnodesqlv8')

const config = {
    server: "MOHIT_AHUJA",
    port: 1433,
    driver: "msnodesqlv8",
    user: "Mohit Ahuja",
    password: "",
    database: "testdb",
    options: {
        trustedConnection: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    }
}
const pool = new sql.ConnectionPool(config);

const connect = async () => {
    if (!pool) {
        pool = new sql.ConnectionPool(config);
    }
    if (!pool.connected) {
        await pool.connect();
    }
};

module.exports = {
    pool, connect
}