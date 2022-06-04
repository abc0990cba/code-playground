import React from 'react';
import '../styles/toolbar.scss';
import { toolState, canvasState } from '../store/';
import { Rect, Brush, Line, Circle, Eraser } from '../tools';

const ToolBar = () => {
  const changeColor = (event) => {
    toolState.setStrokeColor(event.target.value);
    toolState.setFillColor(event.target.value);
  };

  const downloadPicture = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    console.log(dataUrl);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = canvasState.sessionid + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          )
        }
      />
      <button
        className="toolbar__btn rect"
        onClick={() =>
          toolState.setTool(
            new Rect(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          )
        }
      />
      <button
        className="toolbar__btn circle"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      />
      <button
        className="toolbar__btn eraser"
        onClick={() =>
          toolState.setTool(
            new Eraser(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          )
        }
      />
      <button
        className="toolbar__btn line"
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      />
      <label htmlFor="fill-color">FILL</label>
      <input
        className="toolbar__btn color_picker"
        onChange={(e) => changeColor(e)}
        id="fill-color"
        type="color"
      />

      <div className="setting-bar">
        <label htmlFor="line-width">LINE WIDTH</label>
        <input
          onChange={(e) => toolState.setLineWidth(e.target.value)}
          id="line-width"
          type="number"
          defaultValue={1}
          min={1}
          max={50}
        />
        <label htmlFor="stroke-color">STROKE</label>
        <input
          onChange={(e) => toolState.setStrokeColor(e.target.value)}
          className="toolbar__btn color_picker"
          id="stroke-color"
          type="color"
        />

        <button
          className="toolbar__btn undo"
          onClick={() => canvasState.undo()}
        />
        <button
          className="toolbar__btn redo"
          onClick={() => canvasState.redo()}
        />
        <button
          className="toolbar__btn save"
          onClick={() => downloadPicture()}
        />
      </div>
    </div>
  );
};

export default ToolBar;
