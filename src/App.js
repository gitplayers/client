import React from 'react';
import { Home, GamePage, Welcome, Results, NotFound, Invite } from './Pages';
import { Switch, Route } from 'react-router-dom';
import { WeddingProvider } from './Context/WeddingContext';
import { Header } from './Layout';
import './style.css';
function App() {
  return (
    <WeddingProvider>
      <Header />
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
        <Route path="/results/:wedding_name">
          <Results />
        </Route>
        <Route path="/invite/:wedding_name">
          <Invite />
        </Route>
        <Route path="/">
					<NotFound />
				</Route>
      </Switch>
    </WeddingProvider>

  );
}

export default App;