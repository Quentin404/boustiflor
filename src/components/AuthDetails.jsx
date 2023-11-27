import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {IonIcon, IonItem, IonLabel, IonList, IonPopover} from "@ionic/react";
import {
  addOutline,
  leafOutline,
  logInOutline,
  logOutOutline,
  personAddOutline,
  personCircleOutline
} from "ionicons/icons";
import {Link} from "react-router-dom";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => console.log(error));
  };


  return (
    <>
      {authUser ? (
        <>
          <IonItem slot="primary" id="add-plant" button={true} lines="none">
            <IonIcon icon={addOutline} />
          </IonItem>
          <IonPopover trigger="add-plant" triggerAction="click">
            <IonList>
              <Link to="/add">
                <IonItem button={true} lines="none">
                  <IonIcon slot="start" icon={leafOutline}></IonIcon>Ajouter une plante
                </IonItem>
              </Link>
            </IonList>
          </IonPopover>
          <IonItem slot="secondary" id="account-options" button={true} lines="none">
            <IonIcon icon={personCircleOutline} />
          </IonItem>
          <IonPopover trigger="account-options" triggerAction="click">
            <IonList>
              <IonItem>
                <IonLabel>{`Connecté : ${authUser.email}`}</IonLabel>
              </IonItem>
                <IonItem button={true} onClick={userSignOut}><IonIcon slot="start" icon={logOutOutline}></IonIcon>Déconnexion</IonItem>
            </IonList>
          </IonPopover>
        </>
      ) : (
          <>
            <IonItem slot="primary" id="account-options" button={true} lines="none">
              <IonIcon icon={personCircleOutline} />
            </IonItem>
            <IonPopover trigger="account-options" triggerAction="click">
              <IonList>
                <Link to="/login">
                  <IonItem button={true}><IonIcon slot="start" icon={logInOutline}></IonIcon>Se connecter</IonItem>
                </Link>
                <Link to="/signin">
                  <IonItem button={true} lines="none"><IonIcon slot="start" icon={personAddOutline}></IonIcon>S'inscrire</IonItem>
                </Link>
              </IonList>
            </IonPopover>
          </>
      )}
    </>
  );
};

export default AuthDetails;
