import React from 'react';
import { Home, GamePage, Welcome } from './Pages';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <GamePage />
        </Route>
        <Route path="/wedding">
          <Welcome />
        </Route>
      </Switch>
    </>
  );
}

export default App;