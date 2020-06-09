import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonLabel,
  IonContent,
} from "@ionic/react";
import "../styles/update.css";
import {
  TextField,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { updateCustomer } from "../actions/customer";
import CustomLoader from "../components/CustomLoader";

const UpdateCustomer: React.FC<RouteComponentProps> = (props) => {
  const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          borderRadius: "8px",
        },
        input: {
          padding: "15px 14px",
        },
      },
    },
  });

  let [customerId, setCustomerId] = useState<string | null>("");
  let [name, setName] = useState<string | null>("");
  let [contact, setContact] = useState<string | null>("");
  let [errorMsg, setErrorMsg] = useState("");
  let [succesMsg, setSuccessMsg] = useState("");
  let [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    let search = new URLSearchParams(props.location.search);
    setCustomerId(search.get("id"));
    setName(search.get("name"));
    setContact(search.get("contact"));
  }, []);

  const handleNameChange = (name: any) => {
    setErrorMsg("");
    if (!name || name.match(/^[a-zA-Z ]+$/)) {
      setName(name);
    }
  };

  const handleContact = (contct: any) => {
    setErrorMsg("");
    if (!contct || contct.match(/^\d{1,10}$/)) {
      setContact(contct);
    }
  };

  const update = async () => {
    setSuccessMsg("");
    if (contact?.length === 0 || name?.length === 0) {
      setErrorMsg("Fields should not be empty");
    } else {
      if (contact?.length !== 10) {
        setErrorMsg("Contact should be 10 digit");
      } else {
        setShowBackdrop(true);
        let status = await updateCustomer({ customerId, name, contact });
        if (status) {
          setShowBackdrop(false);
          setSuccessMsg("Customer Updated Successfully");
        } else {
          setErrorMsg("Update Failed");
        }
      }
    }
  };

  return (
    <>
      <IonToolbar color="dark">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/customers"></IonBackButton>
        </IonButtons>
        <IonLabel>Update Customer</IonLabel>
      </IonToolbar>
      <IonContent className="ion-padding">
        <CustomLoader open={showBackdrop}></CustomLoader>
        <ThemeProvider theme={theme}>
          {errorMsg.length > 0 && <Alert severity="error">{errorMsg}</Alert>}
          {succesMsg.length > 0 && (
            <Alert severity="success">{succesMsg}</Alert>
          )}
          <div className="input-group">
            <label className="label">CustomerId</label>
            <TextField
              className="input"
              variant="outlined"
              value={customerId}
              disabled={true}
            ></TextField>
          </div>
          <div className="input-group">
            <label className="label"> Name</label>
            <TextField
              className="input"
              variant="outlined"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
            ></TextField>
          </div>
          <div className="input-group">
            <label className="label">Contact</label>
            <TextField
              className="input"
              variant="outlined"
              value={contact}
              onChange={(e) => handleContact(e.target.value)}
            ></TextField>
          </div>
          <div className="input-button">
            <Button
              variant="contained"
              color="primary"
              onClick={() => update()}
            >
              Update
            </Button>
          </div>
        </ThemeProvider>
      </IonContent>
    </>
  );
};

export default UpdateCustomer;
