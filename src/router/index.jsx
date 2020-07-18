import React from "react";
import {
  RouteComponentProps,
  HashRouter as Router,
  Route,
  Switch,
  Prompt,
} from "react-router-dom";
import Home from "../pages/home/Home";
import ContextTest from "../pages/context-test";

const tHome = <Home />;
console.log(new tHome.type().render());

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/c" component={ContextTest} exact />
      </Switch>
    </Router>
  );
};

export default App;
