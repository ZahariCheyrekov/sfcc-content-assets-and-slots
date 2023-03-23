'use strict';

/**
 * @namespace Product
 */

var server = require('server');
server.extend(module.superModule);

var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
* Product-Show : This endpoint is called to show the details of the selected product
* @name Base/Product-Show
* @function
* @memberof Product
* @param {middleware} - cache.applyPromotionSensitiveCache
* @param {middleware} - consentTracking.consent
* @param {querystringparameter} - pid - Product ID
* @param {category} - non-sensitive
* @param {renders} - isml
* @param {serverfunction} - append
*/
server.append('Show', function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('product-button-asset');

    if (content && content.custom.body) {
        var viewData = res.getViewData();
        var product = viewData.product;
        var productUUID = product.uuid;
        var productName = product.productName;
        var productRaing = product.rating;

        var assetBody = content.custom.body.toString();
        assetBody = assetBody.replace('{name}', productName);
        assetBody = assetBody.replace('{uuid}', productUUID);
        assetBody = assetBody.replace('{rating}', productRaing);

        viewData.assetBody = assetBody;
        res.setViewData(viewData);
    }

    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
