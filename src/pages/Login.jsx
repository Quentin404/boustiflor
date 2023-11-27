import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
  IonLabel
} from "@ionic/react";
import {arrowBackOutline} from "ionicons/icons";
import {useHistory} from "react-router-dom";

const Login = () => {
  let auth = "";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);
    setError(null);

    auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        //const user = userCredential.user;
        setIsPending(false);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        setError("Error code: " + errorCode + ". Firebase says: " + errorMessage)
        if (errorCode === "auth/invalid-email"){
          setError("L'adresse e-mail est invalide.");
        }
        else if (errorCode === "auth/invalid-login-credentials") {
          setError("Les informations de connexion sont invalides.");
        } 
        setIsPending(false);
      })
  }

  const backToHome = () => {
    history.push("/")
  }

  return (
      <>
        <IonHeader>
          <IonToolbar>

            <IonItem slot="start" id="add-plant" button={true} onClick={backToHome} lines="none">
              <IonIcon icon={arrowBackOutline} />
            </IonItem>
            <IonTitle>Connexion</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form className="login">

            <IonInput
                required
                type="email"
                label="E-mail"
                fill="outline"
                labelPlacement="floating"
                onIonChange={(e) => setEmail(e.target.value)}>
            </IonInput>
            <br/>
            <IonInput
                required
                type="password"
                label="Mot de passe"
                fill="outline"
                labelPlacement="floating"
                onIonChange={(e) => setPassword(e.target.value)}>
            </IonInput>

            {error && 
              <IonLabel>
                <p>{error}</p>
              </IonLabel>
            }
            
            <br/>
            <IonButton onClick={handleSubmit} disabled={isPending || !password || !email}>
              {isPending ? 'Connexion...' : 'Connexion'}
            </IonButton>
          </form>
        </IonContent>
      </>
  );
}
 
export default Login;
