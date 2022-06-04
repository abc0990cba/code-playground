import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toolState, canvasState } from '../store/';
import { Brush, Rect } from '../tools';
import '../styles/canvas.scss';
import EnterModal from './EnterModal';

const HOST = 'localhost:5000';

const Canvas = observer(() => {
  const canvasRef = React.useRef();
  const usernameRef = React.useRef();
  const [modal, setModal] = React.useState(true);
  const params = useParams();

  React.useEffect(async () => {
    canvasState.setCanvas(canvasRef.current);
    let ctx = canvasRef.current.getContext('2d');
    const { data } = await axios.get(`http://${HOST}/image?id=${params.id}`);

    const img = new Image();
    img.src = data;
    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    };
  }, []);

  React.useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(`ws://${HOST}/`);
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      let ctx = canvasRef.current.getContext('2d');
      toolState.setTool(new Brush(canvasRef.current, socket, params.id, ctx));
      socket.onopen = () => {
        console.log('Подключение установлено');
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: 'connection',
          })
        );
      };
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case 'connection':
            console.log(`пользователь ${msg.username} присоединился`);
            break;
          case 'draw':
            drawHandler(msg);
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case 'rect':
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        );
        break;
      case 'finish':
        ctx.beginPath();
        break;
    }
  };

  const mouseDownHandler = async () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
    const response = await axios.post(`http://${HOST}/image?id=${params.id}`, {
      img: canvasRef.current.toDataURL(),
    });
    console.log('mouseDownHandler:', response.data);
    console.log('state:', canvasState);
  };

  const connectHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };

  return (
    <div className="canvas">
      <EnterModal
        isOpen={modal}
        connectHandler={connectHandler}
        usernameRef={usernameRef}
      />
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef}
        width={600}
        height={400}
      />
    </div>
  );
});

export default Canvas;
