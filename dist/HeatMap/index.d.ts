import React from 'react';
declare type HeatMapProps = {
    minVal?: number;
    maxVal?: number;
    dataX?: number[];
    dataY?: number[];
    dataVal?: number[];
    width?: number;
    height?: number;
};
declare const HeatMap: React.FC<HeatMapProps>;
export default HeatMap;
