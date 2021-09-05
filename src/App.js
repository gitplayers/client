import React from 'react';
import { Home, GamePage } from './Pages';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/game">
          <GamePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;