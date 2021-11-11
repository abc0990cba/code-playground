// http://zhangwenli.com/blog/2015/06/12/drawing-heatmap-with-html-canvas/
// https://github.com/mourner/simpleheat/blob/86af1384db714ab32626ed25aeb396fd0869d56d/simpleheat.js

import React, { useEffect, useRef } from 'react';

type HeatMapProps = {
  minVal?: number;
  maxVal?: number;
  dataX?: number[];
  dataY?: number[];
  dataVal?: number[];
  width?: number;
  height?: number;
};

type PictureDataType = Array<Array<number>>;

const HeatMap: React.FC<HeatMapProps> = ({
  minVal = -1,
  maxVal = 1,
  dataX = [],
  dataY = [],
  dataVal = [],
  width = 380,
  height = 380,
}) => {
  let data: PictureDataType = [];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasBrushRef = useRef<HTMLCanvasElement | null>(null);
  const canvasGradientRef = useRef<HTMLCanvasElement | null>(null);

  let brushSize = width / 200;
  let brushBlurSize = brushSize * 1.3;

  brushSize = width / 140;
  brushBlurSize = brushSize * 1.6;

  let radius = brushSize + brushBlurSize;
  let diametr = radius * 2;

  if (dataX.length == 0) {
    // for (let i = 0; i < 10000; ++i) {
    //   data.push([Math.random() * width, Math.random() * height, Math.random() * 0.3]);
    // }

    for (let i = 0; i < 10000; ++i) {
        data.push([Math.random() * width, Math.random() * height, Math.random()]);
    }
    for (let i = 0; i < 100; ++i) {
        data.push([Math.random() * 20 + i / 2 + 100, 
            Math.random() * 20 + 200, Math.random()]);
    }
    for (let i = 0; i < 100; ++i) {
        data.push([Math.random() * 20 + i / 2 + 300, 
            Math.random() * 20 - i / 3 + 200, Math.random()]);
    }


  } else {
  
    for (let i = 0; i < dataX.length; ++i) {
      // console.log(dataVal[i] + Math.abs(minVal)) / (maxVal + Math.abs(minVal));
      // console.log(dataX[i],dataY[i],dataVal[i])
      data.push([
        (dataX[i] * width) / 400,
        (dataY[i] * height) / 400,
        (dataVal[i] + Math.abs(minVal)) / (maxVal + Math.abs(minVal)),
      ]);
    }
  }

  // const draw = (ctx) => {};

  useEffect(() => {
    // Creating main canvas.
    if (canvasRef.current && canvasBrushRef.current && canvasGradientRef.current) {
      let canvas = canvasRef.current;

      let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;

      // Creating brush canvas.
      const brushCanvas = canvasBrushRef.current;
      const brushContext: CanvasRenderingContext2D | null = brushCanvas.getContext('2d');
      brushCanvas.width = diametr;
      brushCanvas.height = diametr;

      brushContext!.shadowOffsetX = diametr;
      brushContext!.shadowBlur = brushBlurSize;
      brushContext!.shadowColor = 'black';

      brushContext!.fillStyle = '#000000';
      brushContext!.beginPath();
      brushContext!.arc(-radius, radius, brushSize, 0, Math.PI * 2, true);
      brushContext!.closePath();
      brushContext!.fill();

      // Creating gradient color map.
      const levels = 256;
      let canvasGradient = canvasGradientRef.current;
      canvasGradient.width = 1;
      canvasGradient.height = levels;
      let contextGradient = canvasGradient.getContext('2d');

      // const gradientColors: { [key: string]: string } = {
      //   0: 'red',
      //   0.5: "green",
      //   1.0: 'blue',
      // };
      
      const gradientColors: { [key: string]: string } = {
        0.4: 'blue',
        0.5: 'cyan',
        0.6: 'lime',
        0.8: 'yellow',
        1.0: 'red'
      };

      // Draw data.
      for (let i = 0; i < data.length; ++i) {
        const point = data[i];
        const x = point[0];
        const y = point[1];
        const alpha = point[2]; // using value as alpha

        ctx!.globalAlpha = alpha;

        ctx!.drawImage(brushCanvas, x - radius, y - radius);
      }

      // Add color to gradient stops.

      let gradient = contextGradient!.createLinearGradient(0, 0, 0, levels);
      for (let pos in gradientColors) {
        gradient.addColorStop(+pos, gradientColors[pos]);
      }

      contextGradient!.fillStyle = gradient;
      contextGradient!.fillRect(0, 0, canvasGradient.width, levels);
      let gradientPixels = contextGradient!.getImageData(0, 0, 1, levels).data;


      let imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
      let len = imageData.data.length / 4;
      while (len--) {
        let id = len * 4 + 3;
        let alpha = imageData.data[id] / levels; // why not `gradientLevels`?

        let colorOffset = Math.floor(alpha * (levels - 1));

        imageData.data[id - 3] = gradientPixels[colorOffset * 4]; // red
        imageData.data[id - 2] = gradientPixels[colorOffset * 4 + 1]; // green
        imageData.data[id - 1] = gradientPixels[colorOffset * 4 + 2]; // blue
      }

      ctx!.putImageData(imageData, 0, 0);
    }
  }, [data]);

  return (
    <React.Fragment>
      <canvas style={{ display: 'none' }} ref={canvasBrushRef} />
      <canvas style={{ display: 'none' }} ref={canvasGradientRef} />
      <canvas ref={canvasRef} />
    </React.Fragment>
  );
};

export default HeatMap;