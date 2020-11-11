import React, {  useEffect } from "react";
import { Route, Switch } from "react-router-dom";

//Route Page
import Menu from "./Components/menu/Menu";
import Login from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import Social from "./Components/Social/Social";
//Redux
import { Provider } from "react-redux";
import store from "./Components/redux/store";
import { loadUser } from "./Components/redux/action/auth";
import setAuthToken from "./Components/redux/utils/setAuthToken";
import Privateroute from "./Components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <section>
          <Menu />
        <Switch>
          {/* <Route exact path="/Login" component={}/> */}
          <Route exact path="/" component={Login} />
          <Privateroute exact path="/home" component={Home} />
          <Privateroute exact path="/social" component={Social} />
        </Switch>
      </section>
    </Provider>
  );
};

export default App;
