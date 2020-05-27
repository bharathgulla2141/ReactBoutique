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
} from "@ionic/react";
import { close } from "ionicons/icons";
import "../styles/customer.css";
import FileUpload from "./FileUpload";
import TextField from "@material-ui/core/TextField";
import { addCustomer } from "../actions/customer";
import CustomAlert from "../components/CustomAlert";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const AddCustomer: React.FC = () => {
  let [showModal, setShowModal] = useState(false);
  let [fullName, setFullName] = useState("");
  let [contact, setContact] = useState("");
  let [message, setMessage] = useState("");
  let [open, setOpen] = useState(false);
  let [isError, setIsError] = useState(false);

  const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  });

  const emptyfields = () => {
    setFullName("");
    setContact("");
  };

  const setAlertFields = (open: boolean, message: string, iserror: boolean) => {
    setMessage(message);
    setIsError(iserror);
    setOpen(open);
  };

  const handlefName = (e: any) => {
    let fName = e.target.value;
    if (!fName || (fName.match(/^[a-zA-Z ]+$/))) {
      setFullName(fName);
    }
  };

  const handleContact = (e: any) => {
    let cntct = e.target.value;
    if (!cntct || cntct.match(/^\d{1,10}$/)) {
      setContact(cntct);
    }
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    if (fullName.length === 0 || contact.length === 0) {
      setAlertFields(true, "Please enter all fields", true);
    } else {
      if (contact.length !== 10) {
        setAlertFields(true, "Contact should be 10 digit number", true);
      } else {
        let status =  await addCustomer({ fullName : fullName.trim(), contact, active: true });
        if(status) {
          emptyfields();
          setAlertFields(true, "Customer added successfully", false);
        }
        else{
          setAlertFields(true, "Customer with same name exists.Please try with different name.", true);
        }
        
      }
    }
  };

  const handleCustomAlert = () => {
    setOpen(false);
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
      <CustomAlert
        open={open}
        message={message}
        isError={isError}
        handlefunction={handleCustomAlert}
        buttons={[{ title: "Okay", handler: handleCustomAlert }]}
      ></CustomAlert>
    </form>
  );
};

export default AddCustomer;
