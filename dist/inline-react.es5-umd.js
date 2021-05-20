/*InlineReact 1.0.0
Copyright © 2021 manastyretskyi
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.InlineReact = factory(global.React, global.ReactDom));
}(this, (function (React, ReactDom) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var ReactDom__default = /*#__PURE__*/_interopDefaultLegacy(ReactDom);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var Component = (function (_super) {
        __extends(Component, _super);
        function Component(props) {
            var _this = _super.call(this, props) || this;
            _this._componentRef = React__default['default'].createRef();
            _this.state = { childrenProps: props.childrenProps };
            return _this;
        }
        Component.prototype.componentRef = function () {
            return this._componentRef;
        };
        Component.prototype.render = function () {
            return (React__default['default'].createElement(this.props.children, __assign({ ref: this._componentRef }, this.state.childrenProps)));
        };
        return Component;
    }(React__default['default'].Component));

    var InlineReact = (function (_super) {
        __extends(InlineReact, _super);
        function InlineReact() {
            var _this = _super.call(this) || this;
            _this.shadow = _this.attachShadow({ mode: "open" });
            _this.wrapper = document.createElement("div");
            _this.shadow.appendChild(_this.wrapper);
            return _this;
        }
        InlineReact.registerComponent = function (component, name) {
            if (name === void 0) { name = ""; }
            this.components[name !== "" ? name : component.name] = component;
        };
        InlineReact.registerComponents = function (components) {
            for (var name_1 in components) {
                var component = components[name_1];
                this.registerComponent(component, name_1);
            }
        };
        InlineReact.prototype.disconnectedCallback = function () {
            this.unmount();
        };
        Object.defineProperty(InlineReact.prototype, "componentClass", {
            get: function () {
                var componentName = this.getAttribute("component");
                if (typeof componentName !== "string")
                    throw Error;
                var component = InlineReact.components[componentName];
                return component;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineReact.prototype, "componentRef", {
            get: function () {
                return this.component.componentRef().current;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InlineReact.prototype, "props", {
            get: function () {
                var _a;
                return JSON.parse((_a = this.getAttribute("props")) !== null && _a !== void 0 ? _a : "{}");
            },
            enumerable: false,
            configurable: true
        });
        InlineReact.prototype.unmount = function () {
            if (!this.component)
                return;
            ReactDom__default['default'].unmountComponentAtNode(this.wrapper);
        };
        InlineReact.prototype.mount = function () {
            if (!this.componentClass)
                return;
            this.component = ReactDom__default['default'].render(React__default['default'].createElement(Component, { children: this.componentClass, childrenProps: this.props }), this.wrapper);
        };
        InlineReact.prototype.connectedCallback = function () {
            this.mount();
        };
        InlineReact.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
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
        };
        InlineReact.prototype.updateProps = function (newProps) {
            this.setAttribute("props", JSON.stringify(newProps));
        };
        InlineReact.components = {};
        InlineReact.observedAttributes = ["component", "props"];
        return InlineReact;
    }(HTMLElement));
    customElements.define("inline-react", InlineReact);

    return InlineReact;

})));
//# sourceMappingURL=inline-react.es5-umd.js.map
