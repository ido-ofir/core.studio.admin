module.exports = {
    name: 'mui',
    components: [
        require('./components/FlatButton')
    ],
    init(definition, done){
        
        var core = this;

        done({
            go(){ 
                alert('mui is ready to go'); 
            }
        });
    }
};