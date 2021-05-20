import React from "react";
export interface InlineReactProps {
    children: any;
    childrenProps: any;
}
export interface InlineReactState {
    childrenProps: any;
}
export default class Component extends React.Component<InlineReactProps, InlineReactState> {
    constructor(props: InlineReactProps);
    render(): any;
}
