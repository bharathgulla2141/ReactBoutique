import React, { useEffect, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonPage, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import CustomerPage from "./pages/Customer";
import TransactionPage from "./pages/TransactionPage";
import { AppContext } from "./context/AppContext";
import { Observer } from "./firebase/observer";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  let { dispatch } = useContext(AppContext);

  useEffect(() => {
    Observer(dispatch);
  }, [dispatch]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <Menu />
          <IonPage id="menu">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/home" render={() => <Home />} exact={true} />
              <Route
                path="/customers"
                render={() => <CustomerPage />}
                exact={true}
              />
              <Route
                path="/transactions"
                render={() => <TransactionPage />}
                exact={true}
              />
            </Switch>
          </IonPage>
        </IonPage>
      </IonReactRouter>
      <IonLoading
        isOpen={true}
        duration={5000}
        message={"Loading Data ..."}
        spinner="crescent"
      ></IonLoading>
    </IonApp>
  );
};

export default App;
