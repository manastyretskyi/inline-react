import React from "react";

export interface InlineReactProps {
  children: any;
  childrenProps: any;
}

export interface InlineReactState {
  childrenProps: any;
}

export default class Component extends React.Component<
  InlineReactProps,
  InlineReactState
> {
  _componentRef: React.RefObject<React.Component>;

  constructor(props: InlineReactProps) {
    super(props);

    this._componentRef = React.createRef();

    this.state = { childrenProps: props.childrenProps };
  }

  componentRef(): React.RefObject<React.Component> {
    return this._componentRef;
  }

  render() {
    return (
      <this.props.children
        ref={this._componentRef}
        {...this.state.childrenProps}
      />
    );
  }
}
