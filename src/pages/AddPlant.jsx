import { db } from "../firebase/firebase";
import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton, IonToolbar, IonIcon, IonTitle, IonHeader,
} from "@ionic/react";
import {arrowBackOutline} from "ionicons/icons";

export function AddPlant() {
    const [sName, setSName] = useState("");
    const [vName, setVName] = useState("");
    const [family, setFamily] = useState("");
    const [toxicSubstances, setToxicSubstances] = useState("");
    const [toxicOrgans, setToxicOrgans] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [proneSpecies, setProneSpecies] = useState("");
    const [image, setImage] = useState(null); // State to store the selected image file
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleImageUpload = async () => {
        if (image) {
            // Split the original file name into base name and extension
            const originalFileName = image.name;
            const lastDotIndex = originalFileName.lastIndexOf(".");
            const extension = originalFileName.slice(lastDotIndex + 1);

            const randomID = crypto.randomUUID();

            // Create the new file name by combining the snake_case base name and the original extension
            const fileName = `${randomID}.${extension}`;

            const storage = getStorage();
            const storageRef = ref(storage, `img/plants/${fileName}`);

            try {
                await uploadBytes(storageRef, image);

                await addDoc(collection(db, "plants"), {
                    vernacularName: vName,
                    scientificName: sName,
                    family: family,
                    toxicSubstances: toxicSubstances,
                    toxicOrgans: toxicOrgans,
                    symptoms: symptoms,
                    proneSpecies: proneSpecies,
                    imageFilename: fileName, // Use the fileName here
                });

                console.log("Document updated");
                setIsPending(false);
                history.push("/");
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload the image first
        await handleImageUpload();
    };


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

                    <IonTitle>Ajouter une plante</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="stacked">Nom vernaculaire</IonLabel>
                        <IonInput
                            required
                            value={vName}
                            onIonChange={(e) => setVName(e.detail.value)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Nom scientifique</IonLabel>
                        <IonInput
                            type="text"
                            required
                            value={sName}
                            onIonChange={(e) => setSName(e.detail.value)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Famille</IonLabel>
                        <IonInput
                            type="text"
                            required
                            value={family}
                            onIonChange={(e) => setFamily(e.detail.value)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Substances toxiques</IonLabel>
                        <IonInput
                            type="text"
                            required
                            value={toxicSubstances}
                            onIonChange={(e) => setToxicSubstances(e.detail.value)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Organes toxiques</IonLabel>
                        <IonInput
                            type="text"
                            required
                            value={toxicOrgans}
                            onIonChange={(e) => setToxicOrgans(e.detail.value)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Symptômes</IonLabel>
                        <IonInput
                            type="text"
                            required
                            value={symptoms}
                            onIonChange={(e) => setSymptoms(e.detail.value)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Espèces vulnérables</IonLabel>
                        <IonInput
                            type="text"
                            required
                            value={proneSpecies}
                            onIonChange={(e) => setProneSpecies(e.detail.value)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Image</IonLabel>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={handleImageChange}
                        />
                    </IonItem>
                    <IonItem lines="none">
                        {!isPending && <IonButton slot="end" type="submit">Ajouter</IonButton>}
                        {isPending && (
                            <IonButton slot="end" type="button" disabled>
                                Ajout de la plante...
                            </IonButton>
                        )}
                    </IonItem>
                </form>
            </IonContent>
        </>
    );
}
