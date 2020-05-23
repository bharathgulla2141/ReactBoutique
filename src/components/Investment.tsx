import React from "react";
import { IonRow, IonItem, IonDatetime, IonGrid, IonToolbar, IonText, IonButton } from "@ionic/react";
import TextField from "@material-ui/core/TextField";
import InvestmentTable from "./InvestmentTable";
import "../styles/investment.css";

const Investments: React.FC = () => {

  const onDateChange =(e : CustomEvent) => {
      console.log(e.detail);
  }
  
  return (
    <>
      <InvestmentTable/>
      <IonToolbar className="ion-text-center" id="toolbar">
        <IonText>
         Add Investment
        </IonText>
      </IonToolbar>
      <IonGrid>
        <form>
        <IonRow>
          <IonItem id="item" lines="none">
            <IonDatetime placeholder="Select Date"
              onIonChange={(e) => onDateChange(e)}
            />
          </IonItem>
        </IonRow>
        <IonRow>
          <TextField
            label=" Enter Amount"
            variant="outlined"
            style={{ width: "100%",marginBottom:"16px" }}
            inputProps={{ style: { padding: "17px 14px" } }}
          ></TextField>
        </IonRow>
        
        <IonButton expand="block">Submit</IonButton>
        </form>
      </IonGrid>
    </>
  );
};

export default Investments;
