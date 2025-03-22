import { Sequelize } from "sequelize";

const MYSQL_URI = process.env.MYSQL_URI || 'mysql://${DB_USER}:${DB_PASSWORD}@localhost:3306/mydb'

export const sequelize = new Sequelize(MYSQL_URI, {
    logging: true,
});

export const connectDB = async () => {
    try {
        //Test the connection
        await sequelize.authenticate();
        console.log('Connection to MYSQL database succeeded')
    } catch(error) {
        console.error('Unable to connect to the MYSQL database: ', error);
        process.exit(1);    //exit with error code if unable to connect
    }
};