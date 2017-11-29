import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import VisualizePage from "./pages/VisualizePage";
import NotFound from "./pages/NotFound";

import {Route, Link, BrowserRouter as Router, Switch} from "react-router-dom";
import {LinkContainer, IndexLinkContainer} from "react-router-bootstrap";
import {Navbar, NavItem, Nav} from "react-bootstrap";

const Navigation = () => (
    <Navbar inverse>
        <Navbar.Brand>
            <Link to="/"> Financialyzr</Link>
        </Navbar.Brand>
        <Navbar.Collapse>
            <Nav>
                <IndexLinkContainer to="/">
                    <NavItem>Home</NavItem>
                </IndexLinkContainer>
                <LinkContainer to="/upload" exact>
                    <NavItem>Upload</NavItem>
                </LinkContainer>
                <LinkContainer to="/visualize" exact>
                    <NavItem>Visualize</NavItem>
                </LinkContainer>
            </Nav>
            <Nav pullRight>
                <NavItem href="/auth/logout">Logout</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

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