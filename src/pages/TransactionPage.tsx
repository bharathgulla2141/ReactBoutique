import React, { useContext } from "react";
import { IonContent } from "@ionic/react";
import Header from "../components/Header";
import { AppContext } from "../context/AppContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const TransactionPage: React.FC = () => {
  let { state } = useContext(AppContext);

  const handleChange = (event : any , newValue : any) => {
        if(!(newValue == null)){
            console.log(newValue.id);
        }
  }

  return (
    <>
      <Header header="Transactions"></Header>
      <IonContent className="ion-padding">
        <Autocomplete
          options={state.customers}
          getOptionLabel={(option: any) => option.fullName}
          renderInput={(params) => (
            <TextField {...params} label="Select Customer" variant="outlined" />
          )}
          onChange ={(event: any , newValue: any) => handleChange(event,newValue)}
        />
        
      </IonContent>
    </>
  );
};

export default TransactionPage;
