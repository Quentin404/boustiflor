import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonTitle, IonToolbar, IonLabel} from "@ionic/react";
import {arrowBackOutline} from "ionicons/icons";
import {useHistory} from "react-router-dom";

const SignIn = () => {
  let auth = "";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);
    setError(null);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 6;

    if (!isEmailValid || !isPasswordValid) {
      if (!isEmailValid) {
        setError("L'adresse e-mail n'est pas valide.");
      }
      if (!isPasswordValid) {
        setError('Votre mot de passe doit contenir au moins 6 caractères.');
      }
      setIsPending(false);
      return;
    }

    auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
        if (error.code === "auth/email-already-in-use") {
          setError("Un compte avec cette adresse e-mail existe déjà.")
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
            <IonTitle>Inscription</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form className="signin">

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
            <IonButton onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Inscription...' : 'Créer un compte'}
            </IonButton>
          </form>

        </IonContent>
      </>
  );
}
 
export default SignIn;
