import React from 'react';
import { Home, GamePage, Welcome, Results } from './Pages';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game/:id">
          <GamePage />
        </Route>
        <Route path="/wedding/:wedding_name">
          <Welcome />
        </Route>
        <Route path="/results/:id">
          <Results />
        </Route>
      </Switch>
    </>
  );
}

export default App;