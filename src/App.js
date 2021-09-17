import { HashRouter, Route, Switch } from "react-router-dom";
import { Topbar } from "./design/Topbar";
import { Login } from "./signup/Login";
import { Signup } from "./signup/Signup";
import {Homepage} from "./design/Homepage";
import { Logout } from "./signup/Logout";
import { RepastView } from "./repast/RepastView";
import { TypeOf } from "./typeof/TypeOf";
import { Serving } from "./serving/Serving";
import { Addition } from "./addition/Addition";
import Food from "./food/Food";

function App() {
  return (
  <div>
    <HashRouter>
      <Topbar/>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signout" component={Logout}/>
        <Route path="/repast" component={RepastView}/>
        <Route path="/typeof" component={TypeOf}/>
        <Route path="/serving" component={Serving}/>
        <Route path="/addition" component={Addition}/>
        <Route path="/food" component={Food}/>
      </Switch>
    </HashRouter>
  </div>
  );
}

export default App;
