import React, { useEffect, useContext, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonPage } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import CustomerPage from "./pages/Customer";
import TransactionPage from "./pages/TransactionPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import UpdateCustomer from "./pages/UpdateCustomer";
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
import CustomLoader from "./components/CustomLoader";

const App: React.FC = () => {
  let {state, dispatch } = useContext(AppContext);
  let [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    Observer(dispatch);
  },[dispatch]);

  useEffect(() => {
    setTimeout(()=> {
      setShowLoader(false);
    },5000) 
  },[state])

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
              <Route
                path="/transactionHistory"
                render={() => <TransactionHistoryPage />}
                exact={true}
              />
              <Route
                path="/update"
                render={(props) => <UpdateCustomer {...props} />}
              />
            </Switch>
          </IonPage>
        </IonPage>
      </IonReactRouter>
      <CustomLoader open={showLoader}></CustomLoader>
    </IonApp>
  );
};

export default App;
