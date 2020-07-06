import { hot } from "react-hot-loader/root";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import withLazy from "./utils/withLazy";

const PAGES = [
  {
    path: "/",
    params: { exact: true },
    component: withLazy(() => import("@components/A")),
  },
  {
    path: "/b",
    params: { exact: true },
    component: withLazy(() => import("@components/B")),
  },
];

console.log("import", import("@components/A"));

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {PAGES.map(({ path, params, component }) => (
            <Route path={path} component={component} {...params} />
          ))}
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}
export default hot(App);
