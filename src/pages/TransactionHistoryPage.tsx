import React, { useState, useContext } from "react";
import Header from "../components/Header";
import { AppContext } from "../context/AppContext";
import {
  IonContent,
  IonDatetime,
  IonItem,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import TransactionTable from "../components/TransactionTable";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import "../styles/transaction.css";

const TransactionHistoryPage: React.FC = () => {
  let { state } = useContext(AppContext);
  let [transactions, setTransactions] = useState([]);
  let [startDate, setStartDate] = useState<string | null | undefined>("");
  let [endDate, setEndDate] = useState<string | null | undefined>("");
  let [errorAlert, setErrorAlert] = useState("");

  const handleStartDate = (e : any) => {
      setErrorAlert('');
      setStartDate(e.detail.value);
  }

  const handleEndDate = (e : any) => {
    setErrorAlert('');
    setEndDate(e.detail.value);
}

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    if (startDate?.length === 0 || endDate?.length === 0) {
      setErrorAlert("Please select both dates");
    } else {
      let startDateunix = moment(startDate).unix();
      let endDateunix = moment(endDate).unix();

      if (startDateunix > endDateunix) {
        setErrorAlert("Start Date should not be greater than End Date");
      } else {
        let filteredTransactions = state.transactions.filter(
          (transaction: any) => {
            return (
              transaction.date.seconds >= startDateunix &&
              transaction.date.seconds < endDateunix
            );
          }
        );
        setTransactions(filteredTransactions);
      }
    }
  };

  return (
    <React.Fragment>
      <Header header={"Transaction History"}></Header>

      <IonContent className="ion-padding">
        {errorAlert.length > 0 && <Alert severity="error">{errorAlert}</Alert>}
        <form onSubmit={(e) => onFormSubmit(e)}>
          <div id="history-toolbar">
            <IonItem lines="none" className="date-item">
              <IonDatetime
                placeholder="Start Date"
                value={startDate}
                displayFormat="DD MMM YYYY"
                pickerFormat="DD-MMMM-YYYY"
                onIonChange={(e) => handleStartDate(e)}
              ></IonDatetime>
              <IonIcon icon={calendarOutline} slot="end"></IonIcon>
            </IonItem>
            <IonItem lines="none" className="date-item">
              <IonDatetime
                placeholder="End Date"
                value={endDate}
                displayFormat="DD MMM YYYY"
                pickerFormat="DD-MMMM-YYYY"
                onIonChange={(e) => handleEndDate(e)}
              ></IonDatetime>
              <IonIcon icon={calendarOutline} slot="end"></IonIcon>
            </IonItem>
          </div>
          <IonButton type="submit" expand="block" color="medium">
            Submit
          </IonButton>
        </form>
        <TransactionTable transactions={transactions}></TransactionTable>
      </IonContent>
    </React.Fragment>
  );
};

export default TransactionHistoryPage;
