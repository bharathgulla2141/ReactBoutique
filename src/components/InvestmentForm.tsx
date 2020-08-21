import React, { useState } from "react";
import {
  IonRow,
  IonItem,
  IonDatetime,
  IonButton,
  IonToast,
} from "@ionic/react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { addInvestment } from "../actions/investment";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const InvestmentForm: React.FC = () => {
  let [amount, setAmount] = useState("");
  let [date, setDate] = useState<string>();
  let [error, setError] = useState("");
  let [open, setOpen] = useState(false);

  const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  });

  const onDateChange = (e: CustomEvent) => {
    setDate(e.detail.value);
  };

  const onAmountChange = (e: any) => {
    let amount = e.target.value;
    if (!amount || amount.match(/^\d{0,7}$/)) {
      setAmount(amount);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!date || !amount) {
      setError("Please enter all fields");
      setOpen(true);
    } else {
      addInvestment(moment(date).unix(), amount);
      setError("Investment added successfully");
      setDate(undefined);
      setAmount("");
      setOpen(true);
    }
  };
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <IonRow>
          <IonItem id="item" lines="none">
            <IonDatetime
              placeholder="Select Date"
              value={date}
              onIonChange={(e) => onDateChange(e)}
            />
          </IonItem>
        </IonRow>
        <IonRow>
          <ThemeProvider theme={theme}>
          <TextField
            value={amount}
            label=" Enter Amount"
            variant="outlined"
            style={{ width: "100%", marginBottom: "16px" }}
            inputProps={{ style: { padding: "17px 14px" } }}
            onChange={(e) => onAmountChange(e)}
          ></TextField>
          </ThemeProvider>
        </IonRow>
        <IonRow>
          <IonButton expand="block" type="submit" id="button">
            Submit
          </IonButton>
        </IonRow>
      </form>
      <IonToast
        isOpen={open}
        duration={1000}
        message={error}
        onDidDismiss={() => setOpen(false)}
        keyboardClose={true}
        cssClass="toast"
      ></IonToast>
    </>
  );
};

export default InvestmentForm;
