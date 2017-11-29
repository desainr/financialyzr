import React, {Component} from "react";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {IndexLinkContainer, LinkContainer} from "react-router-bootstrap";

// Bootstrap NavBar that links to main components
const Navigation = () => (
    <Navbar inverse>
        <Navbar.Brand>
            <Link to="/">Financialyzr</Link>
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

export default Navigation;
