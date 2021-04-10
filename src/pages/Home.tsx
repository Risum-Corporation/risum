import {
    IonContent,
    IonButton,
    IonHeader,
    IonPage,
    IonTitle,
    IonImg,
    IonLabel,
  } from "@ionic/react";
  import "./Home.css";
  
  const Home: React.FC = () => {
    return (
      <IonPage className="page">
        <IonContent fullscreen>
          <IonImg src={"assets/icon/icon.svg"} className="img" />
  
          <IonTitle className="title" color="primary"> Risum </IonTitle>
  
          <IonButton color="secondary" id="signup-button" className="button" >Criar<br />conta</IonButton>
  
          <IonButton color="primary" id="login-button" className="button">Login</IonButton>
  
          <IonButton

            className="button" id="guest-button">Entrar como convidado </IonButton>

          <IonLabel className="footer">Bem vindo ao Risum!</IonLabel>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Home;
  
