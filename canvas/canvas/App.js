import React, { Component } from 'react';
import Canvas, {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';

export default class App extends Component {

  handleCanvas = (canvas) => {
      if (canvas !== null){
        canvas.width = 100;
        canvas.height = 100;

        const context = canvas.getContext("2d");
        const ellipse = new Path2D(canvas);
        ellipse.ellipse(50, 50, 25, 35, (0 * Math.PI) / 180, 0, 2 * Math.PI);
        context.fillStyle = 'purple';
        context.fill(ellipse);

      }
  }

  render() {
    return (
      <Canvas ref={this.handleCanvas}/>
    )
  }
}
