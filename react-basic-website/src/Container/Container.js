import React from "react";
import Header from "../Component/Layout/Header/Header";
import { Route, Switch } from "react-router-dom";
import MyProfile from "../Component/Layout/MyProfile/MyProfile";
import Home from "../Component/Layout/Home/Home";
import About from "../Component/Layout/About/About";
import MySkill from "../Component/Layout/MySkill/MySkill";
import Footer from "../Component/Layout/Footer/Footer";
import GenericNotFound from "../GenericNotFound";
import Aux from "../Auxiliary";
import Login from "../Component/Layout/Login/Login";
import { useSelector } from "react-redux";
import StateForm from "../Component/Layout/StateForm/StateForm";
import MStateForm from "../Component/Minimize State Form/MStateForm";
import CityForm from "../Component/Layout/CityForm/CityForm";

const Container = () => {
  const authvalue = useSelector((state) => state.allBool.auth);
  return (
    <Aux>
      <Header authorize={authvalue} />
      <Switch>
        <Route
          exact
          path="/Home"
          component={() => <Home authorize={authvalue} />}
        ></Route>
        <Route exact path="/Login" component={() => <Login />}></Route>
        <Route
          exact
          path="/MyProfile"
          component={() => <MyProfile authorize={authvalue} />}
        ></Route>
        <Route
          exact
          path="/About"
          component={() => <About authorize={authvalue} />}
        ></Route>
        <Route
          exact
          path="/MySkill"
          component={() => <MySkill authorize={authvalue} />}
        ></Route>
        <Route
          exact
          path="/StateForm"
          component={() => <StateForm authorize={authvalue} />}
        ></Route>
        <Route
          exact
          path="/MStateForm"
          component={() => <MStateForm authorize={authvalue} />}
        ></Route>
        <Route
          exact
          path="/CityForm"
          component={() => <CityForm authorize={authvalue} />}
        ></Route>
        <Route path="*" exact component={GenericNotFound} />
      </Switch>
      <Footer authorize={authvalue} />
    </Aux>
  );
};

export default Container;
