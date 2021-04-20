import React, { useState } from 'react';
import { 
IonContent,
IonPage,
IonTitle,
IonInput,
IonButton,
IonItem } from '@ionic/react';
import "./Register1_NameMail.css";

const Register1_NameMail: React.FC = () => {

  const [mail, setMail] = useState<string>();
  const [username, setUsername] = useState<string>();

  return (
    <IonPage>
      
      <IonContent>

        <IonTitle className="title">
        {" "}
        Escolha seu< br/> Username email{" "}
        </IonTitle>
 
          <IonItem className="input-mail">
            <IonInput value={mail} placeholder="seumail@mail.com" onIonChange={e => setMail(e.detail.value!)} clearInput></IonInput>
          </IonItem>
          <IonItem className="input-username">
            <IonInput value={username} placeholder="a" onIonChange={e => setUsername(e.detail.value!)} clearInput></IonInput>
          </IonItem>

          <IonButton color="primary"  className="button">
          Confirmar
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Register1_NameMail;