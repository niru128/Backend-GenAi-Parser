import mysql from 'mysql2/promise';

const connectMySQL = async () => {

    const connection = await mysql.createConnection({
        host : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DB

    });

    return connection;
}

export default connectMySQL;