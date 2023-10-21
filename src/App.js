import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/places/new" exact>
            {/* So React will not just stop here but it will keep going till it reaches the end */}
            {/* That's why if you type this exact url, you end up re-directing */}
            {/* That's why we need the Switch component */}
            <NewPlace />
          </Route>
          {/* If the there is no matching path then re-direct back to / */}
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>);
}

export default App;
