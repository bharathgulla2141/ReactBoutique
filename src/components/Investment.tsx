import React, { useState } from "react";
import { IonToolbar, IonText, IonToggle } from "@ionic/react";
import InvestmentTable from "./InvestmentTable";
import InvestmentForm from "./InvestmentForm";
import "../styles/investment.css";

const Investments: React.FC = () => {
  let [toggleChecked, setToggleChecked] = useState(false);
  return (
    <>
      <InvestmentTable />
      <IonToolbar id="toolbar">
        <IonText>Add Investment</IonText>
        <IonToggle
          slot="end"
          checked={toggleChecked}
          onIonChange={(e) => setToggleChecked(e.detail.checked)}
        ></IonToggle>
      </IonToolbar>
      {toggleChecked && <InvestmentForm />}
      
    </>
  );
};

export default Investments;
