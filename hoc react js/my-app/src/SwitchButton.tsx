import React from "react";

interface PropsButton {
  stateLight: boolean; 
}

export default class SwitchButton extends React.Component<PropsButton> {
  render() {
    return (
      <p>The light is {this.props.stateLight ? "ON" : "OFF"}</p>
    );
  }
}
