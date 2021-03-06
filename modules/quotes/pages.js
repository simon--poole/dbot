var _ = require('underscore')._;
var pages = function(dbot) {
    return {
        // Lists quotes in a category
        '/quotes/:key': function(req, res) {
            this.api.getQuoteCategory(req.params.key, function(category) {
                if(category) {
                    res.render('quotes', { 
                        'name': dbot.config.name, 
                        'quotes': category.quotes, 
                        'url_regex': new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)
                    });
                } else {
                    res.render('error', { 
                        'name': dbot.config.name, 
                        'message': 'No quotes under that key.' 
                    });
                }
            });
        },

        // Show quote list.
        '/quotes': function(req, res) {
            this.api.getCategoryKeys(function(keys) {
                res.render('quotelist', { 
                    'name': dbot.config.name, 
                    'quotelist': keys
                });
            });
        },

        '/quoteremovals': function(req, res) {
            res.render('quotes', {
                'name': dbot.config.name,
                'quotes': _.pluck(this.rmCache, 'quote')
            });
        }
    }
};

exports.fetch = function(dbot) {
    return pages(dbot);
};
