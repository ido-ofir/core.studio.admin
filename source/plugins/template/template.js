
module.exports = {
    name: 'template',
    dependencies: [
        'core.components',
        'imports.react'
    ],
    types: [{
        name: 'template',
        schema: [{
            key: 'name',
            type: 'string',
        },{
            key: 'description',
            type: 'string',
        },{
            key: 'dependencies',
            type: 'array',
        },{
            key: 'body',
            type: 'object',
        },{
            key: 'propTypes',
            type: 'array',
        }],
        build(def, done){
            var core = this;
            var { name, propTypes, body, dependencies } = def;
            var template = core.plugins.template.create(body, propTypes);
            core.Component({
                name,
                propTypes,
                dependencies,
                get(){
                    return template;
                },
                done(template){
                    core.templates[name] = template;
                }
            });
            core.definitions[name] = def;
        }
    }],
    extend: {
        Template(def){
            def['$_type'] = 'template';
            return this.build(def);
        }
    },
    init(definition, done){
        
        var core = this;

        var { React } = core.imports;

        function objectToArray(obj){
            return Object.keys(obj).map(p => ({ key: p, value: obj[p] }))
        }

        function parse(item, propNamesString){
            if(!core.isObject(item)) return item;
            let parsed = { ...item };
            if(item.props){
                let props = {};
                let type = core.typeOf(item.props);
                function setProp({ key, value }){
                    if(value && value['core.template.code']){
                        props[key] = eval(`(
                            function ${key}(${propNamesString}){
                                return ${value['core.template.code']};
                            }
                        )`);
                        if(!props['core.template.refs']){ props['core.template.refs'] = []; }
                        props['core.template.refs'].push(key);
                    }
                    else{
                        props[key] = value;
                    }
                }
                if(type === 'object'){
                    objectToArray(item.props).map(setProp)
                }
                else if(type === 'array'){
                    item.props.map(setProp);
                }
                parsed.props = props;
            }
            if(item.children){
                let children = []
                item.children.map(child => {
                    if(child['core.template.code']){
                        child['core.template.function'] = eval(`(
                            function (${ propNamesString }){
                                return ${ child['core.template.code'] };
                            }
                        )`);
                    }
                    children.push(parse(child, propNamesString));
                });
                parsed.children = children;
            }
            return parsed;
        }

        function createElement(definition, propsArray) {
            if(!core.isObject(definition)){ return definition; }
            if(definition['core.template.function']){
                return definition['core.template.function'].apply(core, propsArray);
            }
            let {
                type,
                props = {},
                children = []
            } = definition;

            let component = core.components[type] || type;
            let newProps = { ...props };
            if(props['core.template.refs']){
                props['core.template.refs'].map(key => {
                    newProps[key] = props[key].apply(core, propsArray);
                });
                delete newProps['core.template.refs'];
            }
            let newChildren = children.map(child => createElement(child, propsArray));
            let args = [component, newProps].concat(newChildren);
            return React.createElement.apply(React, args);
        }

        let plugin = {
            create(body, propsTypes){
                var propNamesString = propsTypes.map(p => p.key).join(',');
                var parsed = parse(body, propNamesString);
                return function(props){
                    var propsArray = propsTypes.map(item => (item.key in props ? props[item.key] : item.value));
                    var rendered = createElement(parsed, propsArray);
                    return rendered;
                }
            },
            update(){
                
            }
        };

        done(plugin);
    }
};