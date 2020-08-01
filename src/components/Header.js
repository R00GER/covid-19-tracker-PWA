import React from "react";
import { Link } from "react-router-dom";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";

import Logo from "./Logo";
import "../App.css";

const Header = (props) => {

  return (
    <IonHeader>
      <IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol className="app-title-container ion-no-margin" sizeXs="12" sizeLg="6">
              <Link className="link" to="/">
                <IonTitle
                  className="app-title ion-text-sm-center ion-text-lg-left"
                  color="dark"
                >
                 <IonText color="danger">COVID-19-</IonText>TRACKER
                </IonTitle>
              </Link>
            </IonCol>
            <IonCol className="nav-links-col" sizeMd="6">
              <div className="nav-links">
                <Link className="link" to="/news">
                  <IonTitle color={props.location === "/news" ? "danger" : "dark"}>News</IonTitle>
                </Link>
                <Link className="link" to="/report">
                  <IonTitle color={props.location === "/report" ? "danger" : "dark"}>Report</IonTitle>
                </Link>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar> 
      <Link to="/news">
        <div className="logo-bg">
          <Logo />
        </div>
      </Link>
    </IonHeader>
  );
};

export default Header;
