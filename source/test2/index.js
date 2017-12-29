
module.exports = require('./test2.jsx');

if(module.hot) {
    module.hot.accept('./test2.jsx', function() {
        var test2 = require('./test2.jsx');
        
        core.injector.revoke(test2.name);
        core.Component(test2);
        core.emit('hotUpdate');
    });
}