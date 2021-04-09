import {
    IonContent,
    IonButton,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
  } from "@ionic/react";
  import "./Welcome.css";
  
  const Welcome: React.FC = () => {
    return (
      <IonPage className="page">
        <IonHeader>
  
        </IonHeader>
  
        <IonContent fullscreen>
          <IonImg src={"assets/icon/icon.svg"} className="img" />
  
          <IonTitle className="title" color="primary">
            Risum
          </IonTitle>
  
          <IonButton
            color="secondary"
            size="large"
            id="signup-button"
            className="button"
          >
            Create<br />account
          </IonButton>
  
          <IonButton
            size="large"
            id="login-button"
            className="button"
            color="primary"
          >
            Login
          </IonButton>
  
          <IonButton
            color="tertiary"
            expand="block"
            fill="outline"
            className="button"
            id="guest-button"
          >
            Entrar como convidado
          </IonButton>
  
          <IonToolbar>
            <IonTitle>Welcome to Risum</IonTitle>
          </IonToolbar>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Welcome;
  