import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//Styles.
import "./App.css";

// Pages.
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import StartUp from "./Pages/StartUp/StartUp";
import Board from "./Pages/Board/Board";
import UserTeam from "./Pages/UserTeam/UserTeam";

function App() {
  // const [isAuth, setIsAuth] = useState({ token: "" });

  // useEffect(() => {
  //   setIsAuth({ token: localStorage.getItem("auth-token") });
  // }, []);

  const isAuth = {
    token: localStorage.getItem("auth-token"),
  };

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={StartUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/userteam" component={UserTeam} />
          <Route
            exact
            path="/admin"
            render={() => (isAuth ? <Home /> : <Redirect to="/" />)}
          />
          <Route exact path="/board/:boardname" component={Board} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
