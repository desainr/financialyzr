import React, {Component} from "react";
import {Jumbotron} from "react-bootstrap";
import {Link} from "react-router-dom";

const title = (
    <h2>Not Found</h2>
);

const NotFound = () => (
    <Jumbotron>
        <h1>Page not found</h1>
        <br />
        <h3>The page you are looking for has either been moved or does not exist.</h3>
        <br />
        <Link to="/">Home</Link>
    </Jumbotron>
);

export default NotFound;