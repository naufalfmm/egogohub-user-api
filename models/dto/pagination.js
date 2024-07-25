'use strict';

module.exports.pagination_request_from_req = (req) => {
    return {
        page: (req.query.page && parseInt(req.query.page) || 1),
        limit: (req.query.limit && parseInt(req.query.limit) || 100)
    }
}

module.exports.pagination_response = (page, limit, next, orders) => {
    return {
        page: page,
        limit: limit,
        next: next,
        orders: orders,
    }
}