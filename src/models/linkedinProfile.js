import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const ProfileModel = db.define('linkedIn_profile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    about: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.TEXT
    },
    location: {
        type: DataTypes.STRING
    },
    followerCount: {
        type: DataTypes.STRING,
        defaultValue: 0
    },
    connectionCount: {
        type: DataTypes.STRING,
        defaultValue: 0
    }
}, {
    timestamps: false,
})