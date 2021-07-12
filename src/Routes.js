import React from 'react';
import { Switch, Redirect, Route} from 'react-router-dom'
import {
    Equipe,
    HomePage
} from './views'

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/Homepage"
      />
      <Route path="/Homepage">
          <HomePage />
      </Route>
      <Route path="/Equipe">
          <Equipe />
      </Route>
    </Switch>
  );
};

export default Routes;