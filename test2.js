var server = require("server");
var PageMgr = require("dw/experience/PageMgr");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");
server.get("Get", consentTracking.consent, function (req, res, next) {
    // eslint-disable-next-line
    response.setContentType("application/json");

    var page = PageMgr.getPage(req.querystring.cid);
    
    if (page == null) {
        next();
    } else {
        if (!page.hasVisibilityRules()) {
            var ONE_WEEK = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
            // eslint-disable-next-line
            response.setExpires(ONE_WEEK);
        }

        if (page.isVisible()) {
            const serializedPage = PageMgr.serializePage(page.ID, {});
            // eslint-disable-next-line
            response.writer.print(serializedPage);
        } else {
            next();
        }
    }
}, pageMetaData.computedPageMetaData);
module.exports = server.exports();
