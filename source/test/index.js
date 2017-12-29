
module.exports = require('./test.jsx');

if(module.hot) {
    module.hot.accept('./test.jsx', function() {
        var test = require('./test.jsx');
        test.name = "koko" + "." + "test";
        core.injector.revoke(test.name);
        core.Component(test);
        core.emit('hotUpdate');
    });
}