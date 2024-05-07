import { Sequelize } from "sequelize";

export const db = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'linkedIn_profiles',
});
