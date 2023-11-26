import {
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonPopover,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {Link} from "react-router-dom";
import React from "react";
import {addOutline, leafOutline, personCircleOutline} from "ionicons/icons";

export function Header() {

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle slot="start">Boustiflor</IonTitle>
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
                        <Link to="/login">
                            <IonItem button={true}>Se connecter</IonItem>
                        </Link>
                        <Link to="/signin">
                            <IonItem button={true} lines="none">S'inscrire</IonItem>
                        </Link>
                    </IonList>
                </IonPopover>
            </IonToolbar>
        </IonHeader>
    )
}