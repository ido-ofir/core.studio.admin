
module.exports = require('./mui.js');

if(module.hot) {
    module.hot.accept('./mui.js', function() {
        var plugin = require('./mui.js');
        core.reloadPlugin(plugin);
    });
}