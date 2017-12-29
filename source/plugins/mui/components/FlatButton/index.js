
module.exports = require('./FlatButton.jsx');

if(module.hot) {
    module.hot.accept('./FlatButton.jsx', function() {
        var FlatButton = require('./FlatButton.jsx');
        core.injector.revoke(FlatButton.name);
        core.Component(FlatButton);
        core.emit('hotUpdate');
    });
}