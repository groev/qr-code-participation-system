import React from "react";
import "./style.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "./components/common";
import { Settings, Scan, Generate, Success } from "./components/pages";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/success" component={Success} />
          <Route path="/scan" component={Scan} />
          <Route path="/generate" component={Generate} />
          <Route path="/" component={Settings} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
