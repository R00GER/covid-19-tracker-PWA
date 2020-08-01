import React from "react";
import { Route, Redirect } from "react-router";
import { useLocation } from "react-router-dom";

import { barChartOutline, newspaperOutline } from "ionicons/icons";
import {
  IonApp,
  IonContent,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";

import Header from "./components/Header";
import News from "./news/page/News";
import Report from "./report/page/Report";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";
import "./App.css";

const App = (props) => {
  const location = useLocation();

  return (
    <IonApp>
      <Header location={location.pathname}/>
      <IonContent>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/report">
              <Report />
            </Route>
            <Route path="/" exact render={() => <Redirect to="/news" />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom" className="tabs">
            <IonTabButton tab="news" href="/news">
              <IonIcon className="tab-icons" size="large" icon={newspaperOutline} />
              <IonLabel>News</IonLabel>
            </IonTabButton>
            <IonTabButton tab="report" href="/report">
              <IonIcon className="tab-icons" size="large" icon={barChartOutline} />
              <IonLabel>Report</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonContent>
    </IonApp>
  );
};

export default App;
