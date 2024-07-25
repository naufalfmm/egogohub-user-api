'use strict';

const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'users',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.BIGINT,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: dayjs(),
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: dayjs(),
            },
        },
        {
            tableName: 'users',
            timestamps: false
        }
    )
}