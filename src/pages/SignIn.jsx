import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonTitle, IonToolbar} from "@ionic/react";
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
        setError('Please enter a valid email address.');
      }
      if (!isPasswordValid) {
        setError('Password should be at least 6 characters long.');
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
          setError("An account with this email adress already exists!")
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

            {error && <div className="error">{error}</div>}
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
