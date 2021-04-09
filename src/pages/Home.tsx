import {
    IonContent,
    IonButton,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
    IonLabel,
  } from "@ionic/react";
  import "./Home.css";
  
  const Home: React.FC = () => {
    return (
      <IonPage className="page">
        <IonHeader>
  
        </IonHeader>
  
        <IonContent fullscreen>
          <IonImg src={"assets/icon/icon.svg"} className="img" />
  
          <IonTitle className="title" color="primary"> Risum </IonTitle>
  
          <IonButton
            color="secondary"
            size="large"
            id="signup-button"
            className="button"
          >
            Criar<br />conta
          </IonButton>
  
          <IonButton

            id="login-button"
            className="button"
            color="primary"
          > Login </IonButton>
  
          <IonButton
            color="tertiary"
            expand="block"
            fill="outline"
            className="button"
            id="guest-button"
          > Entrar como convidado </IonButton>

          <IonLabel className="welcome">Bem vindo!</IonLabel>
  
        </IonContent>
      </IonPage>
    );
  };
  
  export default Home;
  
