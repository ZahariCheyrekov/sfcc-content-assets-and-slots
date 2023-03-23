'use strict';

/**
 * @namespace Cart
 */

var server = require('server');
server.extend(module.superModule);

/**
 * Cart-Show : The Cart-Show endpoint renders the cart page with the current basket
 * @name Base/Cart-Show
 * @function
 * @memberof Cart
 * @param {middleware} - server.middleware.https
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.generateToken
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - append
 */
server.append('Show', function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('exclusive-product-tiles');

    if (content && content.custom.body) {
        var viewData = res.getViewData();
        viewData.assetBody = content.custom.body.toString().split(' ');
        res.setViewData(viewData);
    }

    next();
});

module.exports = server.exports();
