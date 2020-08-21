import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonNote,
} from "@ionic/react";
import Header from "../components/Header";
import Payment from "../components/Payment";
import Dashboard from "../components/Dashboard";
import '../styles/transaction.css';

const TransactionPage: React.FC = () => {
  let [dashboard, setDashboard] = useState(false);
  let [payment, setPayment] = useState(false);

  useEffect(() => {
    setDashboard(true);
  }, []);

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
            <IonNote color="primary">Dashboard</IonNote>
          </IonSegmentButton>
          <IonSegmentButton value="payment">
            <IonNote color="primary">Payment</IonNote>
          </IonSegmentButton>
        </IonSegment>
        {dashboard && <Dashboard/>}
        {payment && <Payment/>}
      </IonContent>
    </>
  );
};

export default TransactionPage;
