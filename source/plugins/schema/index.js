
module.exports = require('./schema.js');

if(module.hot) {
    module.hot.accept('./schema.js', function() {
        var plugin = require('./schema.js');
        core.reloadPlugin(plugin);
    });
}