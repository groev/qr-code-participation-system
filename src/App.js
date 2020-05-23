import React from "react";
import "./style.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./util/i18n";
import { Layout } from "./components/common";
import { Settings, Scan, Generate, Success } from "./components/pages";

function App() {
  const email = localStorage.getItem("email");
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/success" component={Success} />
            <Route path="/scan" component={Scan} />
            <Route path="/generate" component={Generate} />
            <Route path="/settings" component={Settings} />
            {email && <Route path="/" component={Scan} />}
            <Route path="/" component={Settings} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
