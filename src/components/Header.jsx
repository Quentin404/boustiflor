import {
    IonHeader,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";
import AuthDetails from "./AuthDetails";

export function Header() {

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle slot="start">Boustiflor</IonTitle>
                <AuthDetails/>
            </IonToolbar>
        </IonHeader>
    )
}