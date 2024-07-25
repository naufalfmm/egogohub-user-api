'use strict';

const dayjs = require("dayjs");

module.exports = class user_usecases {
    persistents
    resources

    constructor(persistents, resources) {
        this.persistents = persistents
        this.resources = resources
    }

    create = async (req) => {
        try {
            return await this.persistents.repositories.user.create({
                name: req.name,
                email: req.email,
                created_at: dayjs(),
                updated_at: dayjs()
            })
        } catch (error) {
            throw error
        }
    }

    update_by_id = async (id, updated_req) => {
        try {
            await this.persistents.repositories.user.update_by_id(id, {
                name: updated_req.name,
                email: updated_req.email,
                updated_at: dayjs()
            })

            return await this.persistents.repositories.user.get_by_id(id)
        } catch (error) {
            throw error;
        }
    }

    get_paginated = async (req) => {
        try {
            const data = await this.persistents.repositories.user.get_paginated(req)

            return {
                page: req.pagination_request.page,
                orders: req.order_requests,
                ...data,
            }
        } catch (error) {
            throw error;
        }
    }
}