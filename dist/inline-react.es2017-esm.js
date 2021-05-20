/*InlineReact 1.0.0
Copyright © 2021 manastyretskyi
 */
import React from 'react';
import ReactDom from 'react-dom';

class Component extends React.Component {
    constructor(props) {
        super(props);
        this._componentRef = React.createRef();
        this.state = { childrenProps: props.childrenProps };
    }
    componentRef() {
        return this._componentRef;
    }
    render() {
        return (React.createElement(this.props.children, Object.assign({ ref: this._componentRef }, this.state.childrenProps)));
    }
}

class InlineReact extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.wrapper = document.createElement("div");
        this.shadow.appendChild(this.wrapper);
    }
    static registerComponent(component, name = "") {
        this.components[name !== "" ? name : component.name] = component;
    }
    static registerComponents(components) {
        for (const name in components) {
            const component = components[name];
            this.registerComponent(component, name);
        }
    }
    disconnectedCallback() {
        this.unmount();
    }
    get componentClass() {
        const componentName = this.getAttribute("component");
        if (typeof componentName !== "string")
            throw Error;
        const component = InlineReact.components[componentName];
        return component;
    }
    get componentRef() {
        return this.component.componentRef().current;
    }
    get props() {
        var _a;
        return JSON.parse((_a = this.getAttribute("props")) !== null && _a !== void 0 ? _a : "{}");
    }
    unmount() {
        if (!this.component)
            return;
        ReactDom.unmountComponentAtNode(this.wrapper);
    }
    mount() {
        if (!this.componentClass)
            return;
        this.component = ReactDom.render(React.createElement(Component, { children: this.componentClass, childrenProps: this.props }), this.wrapper);
    }
    connectedCallback() {
        this.mount();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "component":
                if (this.component)
                    this.unmount();
                if (this.componentClass)
                    this.mount();
                break;
            case "props":
                if (!this.component)
                    return;
                this.component.setState({
                    childrenProps: this.props,
                });
                break;
        }
    }
    updateProps(newProps) {
        this.setAttribute("props", JSON.stringify(newProps));
    }
}
InlineReact.components = {};
InlineReact.observedAttributes = ["component", "props"];
customElements.define("inline-react", InlineReact);

export default InlineReact;
//# sourceMappingURL=inline-react.es2017-esm.js.map
