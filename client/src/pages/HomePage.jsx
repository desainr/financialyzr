import React, {Component} from "react";
import {Row, Col, Panel} from "react-bootstrap";

class HomePage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: "desainr"
        };
    }

    render() {
        return (
            <div id="homePage">
                <Row>
                    <Col xs={4}>
                        <Panel>
                            <h4>Welcome, {this.state.username}</h4>
                        </Panel> 
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HomePage;