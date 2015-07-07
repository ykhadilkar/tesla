'use strict';

var PillBox = require('../models/pillbox');

var ProductController = function () {

};

ProductController.prototype.search = function search(request, reply) {
    reply(PillBox.search(request.url.query.prodcode));
};

module.exports = new ProductController();
