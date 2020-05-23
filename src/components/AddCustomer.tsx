import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonButton,
  IonButtons,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonContent,
  IonToast,
} from "@ionic/react";
import { close } from "ionicons/icons";
import "../styles/customer.css";
import FileUpload from "./FileUpload";
import TextField from "@material-ui/core/TextField";
import { addCustomer } from "../actions/customer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const AddCustomer: React.FC = () => {
  let [showModal, setShowModal] = useState(false);
  let [fullName, setFullName] = useState("");
  let [contact, setContact] = useState("");
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

  const handlefName = (e: any) => {
    let fName = e.target.value;
    if (
      !fName ||
      (fName.match(/^\w+[a-zA-Z_]$/) && fName.length > 1) ||
      fName.length === 1
    ) {
      setFullName(fName);
    }
  };

  const handleContact = (e: any) => {
    let cntct = e.target.value;
    if (!cntct || cntct.match(/^\d{1,10}$/)) {
      setContact(cntct);
    }
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (fullName.length === 0 || contact.length === 0) {
      setError("Please enter all fields");
      setOpen(true);
    } else {
      addCustomer({ fullName, contact, active: true });
      setError("Customer added successfully");
      setOpen(true);
    }
  };

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <IonGrid id="grid">
        <ThemeProvider theme={theme}>
          <IonRow>
            <TextField
              value={fullName}
              label="Enter FullName"
              variant="outlined"
              style={{ width: "100%", marginBottom: "16px" }}
              onChange={(e) => handlefName(e)}
            />
          </IonRow>
          <IonRow>
            <TextField
              value={contact}
              label="Enter Contact"
              variant="outlined"
              style={{ width: "100%", marginBottom: "16px" }}
              onChange={(e) => handleContact(e)}
            />
          </IonRow>
          <IonRow className="button-group">
            <IonButton type="submit">Submit</IonButton>
            <IonButton
              type="button"
              color="medium"
              onClick={() => setShowModal(true)}
            >
              Upload File
            </IonButton>
          </IonRow>
        </ThemeProvider>
      </IonGrid>
      <IonModal isOpen={showModal} backdropDismiss={false} cssClass="modal">
        <IonHeader>
          <IonToolbar color="medium">
            <IonTitle>File Upload</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>
                <IonIcon icon={close}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <FileUpload />
        </IonContent>
      </IonModal>
      <IonToast
        isOpen={open}
        duration={1000}
        message={error}
        onDidDismiss={() => setOpen(false)}
        keyboardClose={true}
        cssClass="toast"
      ></IonToast>
    </form>
  );
};

export default AddCustomer;
