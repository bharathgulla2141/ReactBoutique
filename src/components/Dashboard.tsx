import React, { useState, useContext } from "react";
import { IonToolbar, IonLabel, IonDatetime, IonItem } from "@ionic/react";
import { Box } from "@material-ui/core";
import MonthlyChart from "./MonthlyChart";
import {AppContext} from "../context/AppContext";
import { getMonthsUnixNumberArray, getMonthlyTransactionData } from "../helpers/util";

const Dashboard: React.FC = () => {
  let [year, setYear] = useState("");
  let [data, setData] = useState([0]);

  let {state} = useContext(AppContext);

  const onChangeYear = (e: any) => {
    setYear(e.detail.value);
    let unixstampArray = getMonthsUnixNumberArray(e.detail.value);
    let graphData = getMonthlyTransactionData(unixstampArray,state.transactions);
    setData(graphData);
  };

  return (
    <React.Fragment>
      <h4>Monthly Statistics</h4>
      <IonToolbar id="dashboard-toolbar">
        <IonItem lines="none">
          <IonLabel position="floating">Select Year</IonLabel>
          <IonDatetime
            value={year}
            displayFormat="YYYY"
            pickerFormat="YYYY"
            min="2020"
            max="2030"
            onIonChange={(e) => onChangeYear(e)}
          ></IonDatetime>
        </IonItem>
      </IonToolbar>
      <Box className="card" overflow="auto" component="div" my={2}>
        <MonthlyChart data={data} />
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
