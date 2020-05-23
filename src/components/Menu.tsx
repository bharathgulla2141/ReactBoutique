import React from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonContent,
  IonList,
  IonLabel,
  IonIcon,
  IonImg,
  IonMenuToggle,
} from "@ionic/react";
import { personOutline, homeOutline } from "ionicons/icons";
import "../styles/menu.css";
import transaction from "../images/icons8-transaction-50.png";

const Menu: React.FC = () => {
  return (
    <>
      <IonMenu slot="start" contentId="menu" color="dark">
        <IonHeader>
          <IonToolbar color="dark">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/home">
                <IonIcon slot="start" icon={homeOutline} color="dark"></IonIcon>
                <IonLabel>Home</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/customers">
                <IonIcon
                  slot="start"
                  icon={personOutline}
                  color="dark"
                ></IonIcon>
                <IonLabel>Customers</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/transactions">
                <IonImg
                  slot="start"
                  src={transaction}
                  className="transaction-img"
                ></IonImg>
                <IonLabel>Transactions</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
};

export default Menu;
