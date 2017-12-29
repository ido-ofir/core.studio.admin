var React = require('react');
var ReactDom = require('react-dom');
var core = require('client-core');

core.plugin([
    require('./plugins/mui'),
    require('core.studio.client.web'),
    require('./plugins/template'),
    require('./plugins/schema'),
]);

core.Component('Button', () => <button onClick={ e => core.plugins.studioClient.connect('http://localhost:8081/#/studio') }>Click</button>);

core.Component({
    name: 'Test3',
    docs: `
        # Hello
    `,
    propTypes: [
        {
          "key": "onClick",
          "type": "function",
          "compiled": "()=>{ alert('ok'); }"
        },
        {
          "key": "text",
          "type": "string",
          "value": "3333"
        },
        {
          "key": "disabled",
          "type": "boolean",
          "value": false
        },
        {
          "key": "className",
          "type": "string"
        },
        {
          "key": "style",
          "type": "object",
          "value": {
            "background": "red"
          }
        }
      ],
    get(){
        return {
            render(){
                var { onClick, text, style, disabled  } = this.props;
                return (
                    <button onClick={ onClick } style={ style } disabled={ disabled }>{ text }</button>
                );
            }
        }
    }
})


core.Component('Test2', [], () => {
    return {
        render(){
            return <div>Name: { this.props.name }</div>
        }
    }
});

core.Template({ 
    name: 'Koko',
    body: { 
        type: 'div',
        children: [{
            type: 'button',
            props: {
                onClick(e){ alert('ok') }
            },
            children: ['Hello']
        },{
            type: 'Test3',
            props: { text: '444'},
            children: [{'core.template.code': 'koko + "13"' }]
        }]
    },
    propTypes: [{
        key: 'text',
        type: 'string',
        value: 'Hello'
    },{
        key: 'koko',
        type: 'string',
        value: 'ooo'
    }]
});

core.require(['Koko', 'Test2', 'Test3'], (Koko, Test2, Test3) => {

    ReactDom.render(<div><Koko text="baba" koko="loko"/><Test2/><Test3/></div>, document.getElementById('app'))
});
console.log('core.components', core.components);


