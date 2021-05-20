import React from "react";
export interface ComponentsMap {
    [name: string]: typeof React.Component | React.FunctionComponent;
}
export default class InlineReact extends HTMLElement {
    shadow: ShadowRoot;
    wrapper: HTMLElement;
    component: React.Component;
    static components: ComponentsMap;
    static observedAttributes: string[];
    static registerComponent(component: typeof React.Component | React.FunctionComponent, name?: string): void;
    static registerComponents(components: {
        [key: string]: typeof React.Component | React.FunctionComponent;
    }): void;
    constructor();
    disconnectedCallback(): void;
    get componentClass(): any;
    get props(): any;
    private unmount;
    private mount;
    connectedCallback(): void;
    attributeChangedCallback(name: String, oldValue: String, newValue: String): void;
    updateProps(newProps: any): void;
}
