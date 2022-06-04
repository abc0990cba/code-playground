import React from 'react';
import './styles/app.scss';
import { Canvas, ToolBar } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/:id">
            <div className="tools">
              <ToolBar />
            </div>
            <Canvas />
          </Route>
          <Redirect to={`f${(+new Date()).toString(16)}`} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
