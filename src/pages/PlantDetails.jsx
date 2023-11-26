import React, { useEffect, useState } from "react";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link, useHistory, useParams } from "react-router-dom";
import { getUrl } from "../firebase/firebase.js"
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
    IonBackButton,
    IonButton, IonButtons, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonIcon,
    IonItem, IonLabel,
    IonList, IonModal,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {addOutline, arrowBackOutline} from "ionicons/icons";

const PlantDetails = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "plants", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setPlant(data);

                // Get the image URL
                const url = await getUrl("img/plants/", data.imageFilename);
                setImageUrl(url);

                setLoading(false);
            } else {
                console.log("No such document!");
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = () => {
        deleteDoc(doc(db, "plants", id));
        const storage = getStorage();
        const imageRef = ref(storage, 'img/plants/' + plant.imageFilename);
        deleteObject(imageRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
        history.push("/");
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

                    <IonTitle>{plant.vernacularName}</IonTitle>
                    <IonButtons slot="secondary">
                        <IonButton id="confirm-delete" onClick={() => setIsOpen(true)} color="danger" >Supprimer</IonButton>
                    </IonButtons>
                    <IonButtons slot="primary">
                        <Link to={`/plant/edit/${id}`}>
                            <IonButton>Modifier</IonButton>
                        </Link>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonModal isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Supprimer {plant.vernacularName} ?</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpen(false)}>Annuler</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <p>{plant.vernacularName} ne pourra pas être récupérée ultéreurement.</p>
                        <IonButton expand="block" onClick={handleDelete} color="danger" >Supprimer</IonButton>
                    </IonContent>
                </IonModal>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12" size-md="4">
                                    <IonItem>
                                        <IonLabel>
                                            <h3>Image</h3>
                                            <img className="plant-image" src={imageUrl} alt="" />
                                        </IonLabel>
                                    </IonItem>
                                </IonCol>
                                <IonCol size="12" size-md="8">
                                    <IonList>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Nom vernaculaire</h3>
                                                <p>{plant.vernacularName}</p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Nom scientifique</h3>
                                                <p>{plant.scientificName}</p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Famille</h3>
                                                <p>{plant.family}</p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Substances toxiques</h3>
                                                <p>{plant.toxicSubstances}</p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Organes toxiques</h3>
                                                <p>{plant.toxicOrgans}</p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel className="ion-text-wrap">
                                                <h3>Symptômes</h3>
                                                <p>{plant.symptoms}</p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Espèces vulnérables</h3>
                                                <p>{plant.proneSpecies}</p>
                                            </IonLabel>
                                        </IonItem>
                                    </IonList>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </>
                )}
            </IonContent>
        </>
    );
};

export default PlantDetails;
