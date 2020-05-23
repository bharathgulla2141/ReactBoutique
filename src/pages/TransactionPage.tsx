import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonNote,
} from "@ionic/react";
import Header from "../components/Header";
import CustomerSelectSearch from "../components/CustomerSelectSearch";

const TransactionPage: React.FC = () => {
  let [dashboard, setDashboard] = useState(false);
  let [payment, setPayment] = useState(false);

  useEffect(() => {
    setDashboard(true);
  }, []);

  const handleChange = (event: any, newValue: any) => {
    if (!(newValue == null)) {
      console.log(newValue.id);
    }
  };

  const onSegmentChange = (event: CustomEvent) => {
    if (event.detail.value === "dashboard") {
      setDashboard(true);
      setPayment(false);
    } else if (event.detail.value === "payment") {
      setDashboard(false);
      setPayment(true);
    }
  };

  return (
    <>
      <Header header="Transactions"></Header>
      <IonContent className="ion-padding">
        <IonSegment onIonChange={(e) => onSegmentChange(e)}>
          <IonSegmentButton
            value="dashboard"
            className={dashboard ? "segment-button-checked" : ""}
          >
            <IonNote>Dashboard</IonNote>
          </IonSegmentButton>
          <IonSegmentButton value="payment">
            <IonNote>Payment</IonNote>
          </IonSegmentButton>
        </IonSegment>
        {payment && <CustomerSelectSearch handleChange={handleChange} />}
      </IonContent>
    </>
  );
};

export default TransactionPage;
