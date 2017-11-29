import HomePage from "../pages/HomePage";
import UploadPage from "../pages/UploadPage";
import VisualizePage from "../pages/VisualizePage";
import NotFound from "../pages/NotFound";
import Navigation from "./Navigation";

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

export default Routes;