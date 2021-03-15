import React, { Component } from "react";
import { View } from "react-native";

export default class Wall extends Component {
    render() {

        /*
        Nesnelerin başlangıç ve bitiş koordinatları

        console.log("************");
        console.log(this.props.body.bounds.max.x);
        console.log(this.props.body.bounds.min.x);
        console.log("************");*/

        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        return (
            <View
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    backgroundColor: this.props.color
                }} />
    );
  }
}
