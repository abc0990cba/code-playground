import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import Konva from "konva";

const WIDTH = 1100;
const HEIGHT = 50;

const ColoredRect = ({points}) => {
  //const points = [0.1, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.1, 0.2, 0.1, 0.02];
  const createGradient = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let gradient = ctx.createLinearGradient(0, HEIGHT/2, WIDTH, HEIGHT/2);

    const step = 1 / points.length;
    for(let i = 0; i < points.length; i++ ){
        const r = 255 - points[i] * 255;
        const g = 0;
        const b = 50;
        gradient.addColorStop(i * step, `rgb(${r},${g},${b})`);
    }

    return gradient;
  };


  return (
    <Rect
      x={0}
      y={0}
      width={WIDTH}
      height={HEIGHT}
      fill={createGradient()}
      shadowBlur={2}
      stroke="black"
    />
  );
};

export const Graphics = ({data, maxElem, minElem}) => {
  //convert array to  0..1
  data.forEach(el => {
    el += Math.abs(minElem);
    el /= maxElem + minElem;
  });

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (loaded)
    return (
      <Stage width={WIDTH} height={HEIGHT}>
        <Layer>
          {/* <Text text="" /> */}
          <ColoredRect points={data}/>
        </Layer>
      </Stage>
    );
  else {
    return <></>;
  }
};
