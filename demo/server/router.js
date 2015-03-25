var _ = require('underscore');

function Router() {
    this.route = function(app) {
        app.get('/', function(req, res) {
            res.redirect('/building/roguelikeboard')
        });

        var webRoutes = ['/building/roguelikeboard'];
        _.each(webRoutes, function(route) {
            app.get(route, function (req, res) {
                res.render('index', {});
            });
        });
    };
};

module.exports = new Router();