import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";

const App = () => (
    <div className="container">
        <div className="text-center">
            <HomePage/>
        </div>
    </div>
);
ReactDOM.render(<App />, document.getElementById("app"));