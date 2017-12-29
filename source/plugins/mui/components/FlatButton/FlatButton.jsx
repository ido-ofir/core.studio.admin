
import FlatButton from 'material-ui/FlatButton';

module.exports = {
    name: "FlatButton",
    description: '',
    propTypes: {
        backgroundColor: 'string',
        className: 'string',
        disableTouchRipple: 'boolean',
        disabled: 'boolean',
        fullWidth: 'boolean',
        hoverColor: 'string',
        href: 'string',
        label: 'string',
        labelPosition: {
            type: 'string',
            input: 'select',
            options: ['before', 'after'],
            value: 'after'
        },
        labelStyle: 'object',
        onClick: {
            type: 'function',
            value: '() => { alert("Button click") }'
        },
        onKeyboardFocus: {
            type: 'function',
            value: '() => {  }'
        },
        primary: 'boolean',
        secondary: 'boolean',
        rippleColor: 'string',
        style: 'object'
    },
    dependencies: [],    
    get() {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                // title: PropTypes.string
            },
            getDefaultProps(){
                return {

                };
            },
            getInitialState() {

                return {

                };
            },
            componentDidMount() {

            },
            componentWillUnmount() {

            },
            render() {

                return <FlatButton { ...this.props}>{ this.props.children }</FlatButton>;
            }            
        }
    }
}