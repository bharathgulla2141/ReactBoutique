import React, { useState } from "react";
import { IonItem, IonButton, IonText } from "@ionic/react";
import XLSX from "xlsx";
import { addCustomersData } from "../actions/customer";

interface Customer {
  fullName: string;
  contact: string;
  outStandingAmount: number;
}

const FileUpload = () => {
  let [parsedData, setParsedData] = useState<Array<any>>([]);
  let [successMsg, setSuccessMsg] = useState("");

  const handleFileUplaod = (event: any) => {
    event.preventDefault();

    let files = event.target.files;
    let file = files[0];
    var reader = new FileReader();
    reader.onload = function (event: any) {
      var data = event.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json<Customer>(ws);
      setParsedData(dataParse);
    };
    reader.readAsBinaryString(file);
  };

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    console.log(parsedData);
    addCustomersData(parsedData);
    setSuccessMsg('File Uploaded Successfully')
  };

  return (
    <>
      <form id="upload" onSubmit={(e) => handleOnSubmit(e)}>
        {successMsg && (
          <IonItem lines="none">
            <IonText color="success">{successMsg}</IonText>
          </IonItem>
        )}
        <IonItem id="rounded" lines="none">
          <input type="file" onChange={handleFileUplaod}></input>
        </IonItem>
        <IonButton type="submit">Submit</IonButton>
      </form>
    </>
  );
};

export default FileUpload;
