'use strict';

const { Op, where, Sequelize } = require('sequelize');
const { user_missing_err } = require('../../../consts/errors');
const { pagination } = require('../../../utils/pagination_helper');

module.exports = class user_repositories {
    resource
    user

    constructor(resource) {
        this.resource = resource
        this.user = require('../../../models/dao').db.user
    }

    create = async(data) => {
        try {
            return await this.user.create(data, {transaction: this.resource.pgsql.trx})
        } catch (error) {
            throw error;
        }
    }

    update_by_id = async(id, updated_data) => {
        try {
            await this.user.update(updated_data, {
                where: {
                    id: id,
                }
            })
        } catch (error) {
            throw error;
        }
    }

    get_by_id = async (id) => {
        try {
            const us = await this.user.findOne({ 
                where: {
                    id: id
                }
             })

            if (us === null) {
                throw user_missing_err
            }
        } catch (error) {
            throw error;
        }
    }

    get_paginated = async(req) => {
        try {
            let filter = {}

            if (req.filter_request !== undefined && req.filter_request !== null) {
                if (req.filter_request.name) {
                    filter["name"] = {
                        [Op.iLike]: '%' + req.filter_request.name + '%'
                    }
                }

                if (req.filter_request.email) {
                    filter["email"] = {
                        [Op.iLike]: '%' + req.filter_request.email + '%'
                    }
                }
            }

            let orders = [],
                order_map = {
                    'created_at': 'users.created_at'
                }
            
            for (let i = 0; i < req.order_requests.length; i++) {
                let order_key = req.order_requests[i],
                    order_term = 'ASC'
                if (order_key[0] == '-') {
                    order_key = order_key.slice(1)
                    order_term = 'DESC'
                }

                if (!order_map[order_key]) {
                    continue
                }

                orders.push([Sequelize.col(order_map[order_key]), order_term])
            }

            const pagination_opt = pagination(req.pagination_request.page, req.pagination_request.limit)

            const items = await this.user.findAll({
                ...pagination_opt,
                where: filter,
                include: this.resource.pgsql.get_preloads(),
                order: orders,
            })

            const nextItem = await this.user.findOne({
                offset: pagination_opt.limit,
                where: filter,
                include: this.resource.pgsql.get_preloads(),
                order: orders,
            })

            return {
                next: (nextItem !== null),
                items: items,
            }
        } catch (error) {
            throw error;
        }
    }
}