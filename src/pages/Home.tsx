import { IonContent } from "@ionic/react";
import React from "react";
import Header from "../components/Header";
import Investment from "../components/Investment";

const Home: React.FC = () => {

  return (
    <>
      <Header header="Home" />
      <IonContent className="ion-padding">
        <Investment />
      </IonContent>
    </>
  );
};

export default Home;
