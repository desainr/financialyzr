import React, {Component} from "react";
import {Panel, PageHeader} from "react-bootstrap";

class HomePage extends Component{
    render() {
        return (
            <div className="absolute-center main-page">
                <Panel>
                    <h4>Congrats, you logged in.</h4>
                    <a href="/auth/logout">Logout</a>
                </Panel>
            </div>
        );
    }
}

export default HomePage;