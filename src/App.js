import React from 'react';
import { Home, Game } from './Pages';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/game">
          <Game />
        </Route>
      </Switch>
    </>
  );
}

export default App;