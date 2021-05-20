import React from "react";
import ReactDom from "react-dom";

import Component from "./component";

export interface ComponentsMap {
  [name: string]: typeof React.Component | React.FunctionComponent;
}

export default class InlineReact extends HTMLElement {
  shadow: ShadowRoot;
  wrapper: HTMLElement;
  component!: Component;

  static components: ComponentsMap = {};
  static observedAttributes = ["component", "props"];

  static registerComponent(
    component: typeof React.Component | React.FunctionComponent,
    name: string = ""
  ): void {
    this.components[name !== "" ? name : component.name] = component;
  }

  static registerComponents(components: {
    [key: string]: typeof React.Component | React.FunctionComponent;
  }) {
    for (const name in components) {
      const component = components[name];
      this.registerComponent(component, name);
    }
  }

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.wrapper = document.createElement("div");
    this.shadow.appendChild(this.wrapper);
  }

  disconnectedCallback() {
    this.unmount();
  }

  get componentClass(): any {
    const componentName = this.getAttribute("component");
    if (typeof componentName !== "string") throw Error;

    const component = InlineReact.components[componentName];

    return component;
  }

  get componentRef(): React.Component | null {
    return this.component.componentRef().current;
  }

  get props(): any {
    return JSON.parse(this.getAttribute("props") ?? "{}");
  }

  private unmount() {
    if (!this.component) return;

    ReactDom.unmountComponentAtNode(this.wrapper);
  }

  private mount() {
    if (!this.componentClass) return;

    // @ts-ignore
    this.component = ReactDom.render(
      <Component children={this.componentClass} childrenProps={this.props} />,
      this.wrapper
    );
  }

  connectedCallback() {
    this.mount();
  }

  attributeChangedCallback(name: String, oldValue: String, newValue: String) {
    switch (name) {
      case "component":
        if (this.component) this.unmount();
        if (this.componentClass) this.mount();

        break;
      case "props":
        if (!this.component) return;

        this.component.setState({
          childrenProps: this.props,
        });
        break;
    }
  }

  updateProps(newProps: any) {
    this.setAttribute("props", JSON.stringify(newProps));
  }
}

customElements.define("inline-react", InlineReact);
