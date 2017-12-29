module.exports = {
    name: 'schema',
    extend: {
        schema(){
            var schema = this.plugins.schema;
            schema.parse.apply(schema, arguments);
        }
    },
    init(definition, done){
        
        var core = this;

        function schemaItem(key, item){
            var type = core.typeOf(item);
            if(type === 'string'){
                return {
                    key: key,
                    type: item
                };
            }
            if(type === 'object'){
                return {
                    key: key,
                    type: 'object',
                    ...item,
                };
            }
            if(type === 'array'){
                return {
                    key: key,
                    type: item[0],
                    value: item[1],
                    input: 'Select',
                    options: item[2],
                };
            }
            return {
                key: key,
                type: type,
                value: item,
            };
        };

        done({
            parse(schema){
                if(!schema) return;
                var type = core.typeOf(schema);
                if(type === 'object'){
                    schema = Object.keys(schema).map(key => schemaItem(key, schema[key]));
                }
                else if(type !== 'array'){
                    throw new Error(`cannot make schema from ${ type }`)
                }
                return schema;
            },
            build(schema){
                var result = {};
                schema.map(item => {
                    var build = { ...item, $_type: item.type };
                    console.log('build', build);
                    result[item.key] = core.build(build);
                });
                return result;
            }
        });
    }
};