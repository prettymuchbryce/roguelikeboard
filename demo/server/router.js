var _ = require('underscore');

function Router() {
    this.route = function(app) {
        var webRoutes = ['/'];
        _.each(webRoutes, function(route) {
            app.get(route, function (req, res) {
                res.render('index', {});
            });
        });
    };
};

module.exports = new Router();