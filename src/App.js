import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import Feedback from './pages/Feedback/Feedback';
import Setting from './pages/Setting/Setting';
import Ranking from './pages/Ranking/Ranking';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/feedback" component={Feedback} />
          <Route exact path="/setting" component={Setting} />
          <Route exact path="/ranking" component={Ranking} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
