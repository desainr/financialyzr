import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import VisualizePage from "./pages/VisualizePage";
import NotFound from "./pages/NotFound";
import Navigation from "./pages/components/Navigation";

import {Route, Link, BrowserRouter as Router, Switch} from "react-router-dom";
import {LinkContainer, IndexLinkContainer} from "react-router-bootstrap";
import {Navbar, NavItem, Nav} from "react-bootstrap";


const Routes = () => (
    <div>
        <div id="nav">
            <Navigation />
        </div>
        <div className="container"> 
            <Switch>
                <Route exact path = "/" component = {HomePage}/>
                <Route exact path ="/upload" component={UploadPage}/>
                <Route exact path="/visualize" component={VisualizePage}/>
                <Route component = {NotFound}/>
            </Switch>
        </div>
    </div>
);

const App = () => (
    <Router>
        <Routes />
    </Router>
);

ReactDOM.render(<App />, document.getElementById("app"));