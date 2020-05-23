import React from "react";
import {
  IonHeader,
  IonButtons,
  IonTitle,
  IonToolbar,
  IonMenuButton,
} from "@ionic/react";

interface HeaderProps {
    header : string
}

const Header: React.FC<HeaderProps> = ({header}) => {
  return (
    <IonHeader>
      <IonToolbar color="dark">
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>{header}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
