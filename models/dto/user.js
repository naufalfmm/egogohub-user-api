'use strict';

const { pagination_response } = require("./pagination");

module.exports.user_response_from_dao = (dao) => {
    return {
        name: dao.name,
        email: dao.email,
        created_at: dao.created_at,
        updated_at: dao.updated_at,
    }
}

module.exports.users_response_from_daos = (daos) => {
    let resps = []

    for (let i = 0; i < daos.length; i++) {
        resps.push(this.user_response_from_dao(daos[i]))
    }

    return resps
}

module.exports.user_paginated_from_data = (data) => {
    const items = this.users_response_from_daos(data.items)
    
    return {
        ...pagination_response(data.page, data.limit, data.next, data.orders),
        items: items
    }
}