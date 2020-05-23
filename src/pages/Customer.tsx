import React, { useState, useEffect } from "react";
import { IonContent, IonSegment, IonSegmentButton, IonNote } from "@ionic/react";
import Header from "../components/Header";
import AddCustomer from "../components/AddCustomer";
import ViewCustomers from "../components/ViewCustomers";



const CustomerPage: React.FC = () => {

  let [addTab , setAddTab] = useState(false);
  let [viewTab , setViewTab] = useState(false);
 

  useEffect(() => {
    setAddTab(true);
  },[])

  const onSegmentChange = (event : CustomEvent) => {
      if(event.detail.value === 'add'){
        setAddTab(true);
        setViewTab(false);
      }
      else if(event.detail.value === 'view') {
        setAddTab(false);
        setViewTab(true);
      }       
  }
    
  return (
    <>
      <Header header="Customers" />
      <IonContent className="ion-padding">
        <IonSegment onIonChange= { (e) => onSegmentChange(e)}>
          <IonSegmentButton value="add" className={addTab ? "segment-button-checked" : ''}> 
            <IonNote>Add</IonNote>
          </IonSegmentButton>
          <IonSegmentButton value="view">
            <IonNote>View</IonNote>
          </IonSegmentButton>
        </IonSegment>

        {addTab && <AddCustomer></AddCustomer>}
        {viewTab && <ViewCustomers/>}
        
      </IonContent>
    </>
  );
};

export default CustomerPage;
