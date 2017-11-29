import React from "react";
import ReactDOM from "react-dom";

import Routes from "./components/Routes";
import {BrowserRouter as Router} from "react-router-dom";

const App = () => (
    <Router>
        <Routes />
    </Router>
);

ReactDOM.render(<App />, document.getElementById("app"));