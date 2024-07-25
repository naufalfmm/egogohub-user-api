'use strict';

const { DataTypes } = require('sequelize');

const Db = class {
    user

    constructor(pgsql) {
        this.user = require('./user')(pgsql, DataTypes)
    }
}

module.exports.initialize_model = (pgsql) => {
    module.exports.db = new Db(pgsql)
}