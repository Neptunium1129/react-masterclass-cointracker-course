import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
}

function Router({} : IRouterProps){
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
    
        <Switch>
            <Route path="/coin/:coinId">
                <Coin />
            </Route>
            <Route path={["/","/main"]}>
                <Coins />
            </Route>
        </Switch>
    </BrowserRouter>

}

export default Router;