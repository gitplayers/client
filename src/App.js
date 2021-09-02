import React from 'react';
import { Home } from './Pages';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;