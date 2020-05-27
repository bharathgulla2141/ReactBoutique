import React, { useState } from "react";
import CustomerSelectSearch from "../components/CustomerSelectSearch";
import {
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonLoading,
} from "@ionic/react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { saveTransaction } from "../actions/transaction";
import CustomAlert from "./CustomAlert";
import { Typography } from "@material-ui/core";

const Payment: React.FC = () => {
  let [type, setType] = useState("");
  let [customer, setCustomer] = useState<any>(null);
  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");
  let [open, setOpen] = useState(false);
  let [isError, setIsError] = useState(false);
  let [buttons, setButtons] = useState([]);
  let [showBalance, setShowBalance] = useState(false);
  let [showLoader, setShowLoader] = useState(false);

  const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  });

  const handleChange = (event: any, newValue: any) => {
    if (!(newValue == null)) {
      setCustomer(newValue);
      setShowBalance(true);
    } else {
      setCustomer(null);
      setShowBalance(false);
    }
  };

  const handleAmount = (event: any) => {
    let amount = event.target.value;
    if (!amount || amount.match(/^\d{0,7}$/)) {
      setAmount(amount);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!customer || !type || !amount) {
      setAlertFields(true, "Please enter all the fields", true, [
        { title: "Okay", handler: handleCustomAlert },
      ]);
      return false;
    } else {
      if (type === "clear" && Number(amount) > Number(customer.balance)) {
        setAlertFields(
          true,
          "Amount should not be more than customer balance",
          true,
          [{ title: "Okay", handler: handleCustomAlert }]
        );
        setAmount("");
      } else {
        setShowBalance(false);
        setAlertFields(true, "Confirm the payment ?", false, [
          { title: "Yes", handler: alertYes },
          { title: "No", handler: handleCustomAlert },
        ]);
      }
    }
  };

  const emptyFields = () => {
    setAmount("");
    setType("");
    setShowBalance(false);
    setCustomer(null);
  };

  const alertYes = async () => {
    handleCustomAlert();
    setShowLoader(true);
    let transactionCustomer = customer;
    setCustomer(null);
    let paymentStatus = await saveTransaction(transactionCustomer, amount, type);
    if (paymentStatus) {
      setShowLoader(false);
      setAlertFields(true, "Transaction saved successfully", false, [
        { title: "Okay", handler: handleCustomAlert },
      ]);
    } else {
      setShowLoader(false);
      setAlertFields(true, "Transaction failed", true, [
        { title: "Okay", handler: handleCustomAlert },
      ]);
    }
    emptyFields();
  };

  const handleCustomAlert = () => {
    setOpen(false);
  };

  const setAlertFields = (
    open: boolean,
    message: string,
    isError: boolean,
    buttons: any
  ) => {
    setOpen(open);
    setMessage(message);
    setIsError(isError);
    setButtons(buttons);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <ThemeProvider theme={theme}>
        <CustomerSelectSearch handleChange={handleChange} customer={customer} />
        {showBalance && (
          <Typography variant="caption" color="error">
            {"Customer Balance : " + customer.balance}
          </Typography>
        )}
        <IonToolbar id="transaction-toolbar">
          <IonSelect
            value={type}
            slot="end"
            placeholder="Type"
            onIonChange={(e) => setType(e.detail.value)}
            className="select"
          >
            <IonSelectOption value="add">Add</IonSelectOption>
            <IonSelectOption value="clear">Clear</IonSelectOption>
          </IonSelect>
          <TextField
            value={amount}
            label="Enter Amount"
            variant="outlined"
            style={{ marginTop: "5px" }}
            onChange={(e) => handleAmount(e)}
          ></TextField>
        </IonToolbar>
        <IonToolbar id="transaction-toolbar">
          <IonButton type="submit">Submit</IonButton>
        </IonToolbar>
      </ThemeProvider>
      <CustomAlert
        open={open}
        message={message}
        handlefunction={handleCustomAlert}
        buttons={buttons}
        isError={isError}
      ></CustomAlert>
      <IonLoading
        isOpen={showLoader}
        message="Please wait ..."
        backdropDismiss={false}
        duration={10000}
      ></IonLoading>
    </form>
  );
};

export default Payment;
