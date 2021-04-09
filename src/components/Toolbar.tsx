// Colocar isso no App.tsx mais pra frente, coloquei no componente separado para trabalhar nas telas de cadastro e login por enquanto

import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { person, settings, star } from "ionicons/icons";
import Home from "../pages/Home";
import Tab1 from "../pages/Tabs/Tab1";
import Tab2 from "../pages/Tabs/Tab2";
import Tab3 from "../pages/Tabs/Tab3";

const Toolbar: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/tab1">
          <Tab1 />
        </Route>
        <Route exact path="/tab2">
          <Tab2 />
        </Route>
        <Route path="/tab3">
          <Tab3 />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon icon={star} />
          <IonLabel>Feed</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Toolbar;
