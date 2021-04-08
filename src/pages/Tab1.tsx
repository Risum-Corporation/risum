import {
  IonContent,
  IonButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/react";
import "./Tab1.css";

const Tab1: React.FC = () => {
  return (
    <IonPage className="page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bem-vindo!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Teste</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonImg src={"assets/icon/icon.svg"} />
          </IonRow>
          <IonRow>
            <IonTitle className="title" color="primary">Risum</IonTitle>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                color="secondary "
                size="large"
                id="signup-button"
                className="button"
              >
                Cadastrar
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                size="large"
                id="login-button"
                className="button"
                fill="outline"
              >
                Login
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonButton color="tertiary" expand="block" fill="outline">
              Entrar como convidado
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
