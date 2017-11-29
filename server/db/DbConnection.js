const db = require("mysql");
require("dotenv").config();

class Database { 
    constructor() {
        this.connection = db.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA
        });
    }

    /**
     * Database connection query
     * @param {*} sql - SQL query
     * @param {*} params - parameters (optional)
     * @param {*} callback - callback function
     */
    query(sql, params = null, callback) {
        let result = null;
        if(params) {
            result = this.connection.query(sql, params, callback);
        } else {
            result = this.connection.query(sql, callback);
        }
        return result;
    }
}

module.exports = Database;