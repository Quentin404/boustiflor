import React, { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, getUrl } from "../firebase/firebase";
import {useHistory, useParams} from "react-router-dom";
import { uploadBytes, getStorage, ref, deleteObject } from "firebase/storage";
import {
    IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel, IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {arrowBackOutline} from "ionicons/icons";

const EditPlant = () => {
    const { id } = useParams();
    const [sName, setSName] = useState('');
    const [vName, setVName] = useState('');
    const [family, setFamily] = useState('');
    const [toxicSubstances, setToxicSubstances] = useState('');
    const [toxicOrgans, setToxicOrgans] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [proneSpecies, setProneSpecies] = useState('');
    const [image, setImage] = useState(null);  // State to store the selected image file
    const [imageFilename, setImageFilename] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "plants", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setVName(data.vernacularName);
                setSName(data.scientificName);
                setFamily(data.family);
                setToxicSubstances(data.toxicSubstances);
                setToxicOrgans(data.toxicOrgans);
                setSymptoms(data.symptoms);
                setProneSpecies(data.proneSpecies);
                setImageFilename(data.imageFilename);
                // Get the image URL
                const url = await getUrl("img/plants/", data.imageFilename);
                setImageUrl(url);
            } else {
                console.log("No such document!");
            }

            setLoading(false);
        };

        fetchData();
    }, [id]);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleImageUpload = async () => {
        if (image) {
            // Split the original file name into base name and extension
            const originalFileName = image.name;
            const lastDotIndex = originalFileName.lastIndexOf('.');
            const extension = originalFileName.slice(lastDotIndex + 1);

            const randomID = crypto.randomUUID();

            // Create the new file name by combining the snake_case base name and the original extension
            const fileName = `${randomID}.${extension}`;

            const storage = getStorage();
            const formerImageRef = ref(storage, 'img/plants/' + imageFilename);
            const newImageRef = ref(storage, `img/plants/${fileName}`);

            try {
                deleteObject(formerImageRef).then(() => {
                    // File deleted successfully
                }).catch((error) => {
                    console.error("Deletion failed : " + error)
                });
                await uploadBytes(newImageRef, image);
                setImageFilename(fileName);

                // Call setDoc here to ensure it's executed after the image is uploaded
                await setDoc(doc(db, "plants", id), {
                    vernacularName: vName,
                    scientificName: sName,
                    family: family,
                    toxicSubstances: toxicSubstances,
                    toxicOrgans: toxicOrgans,
                    symptoms: symptoms,
                    proneSpecies: proneSpecies,
                    imageFilename: fileName // Use the fileName here
                }, {
                    merge: true
                });

                console.log("Document updated");
                setIsPending(false);
                history.push('/plant/'+id);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Si l'image est sélectionnée, téléchargez l'image et mettez à jour les données
        if (image) {
            await handleImageUpload();
        } else {
            // Si aucune image n'est sélectionnée, mettez simplement à jour les données
            try {
                await setDoc(doc(db, "plants", id), {
                    vernacularName: vName,
                    scientificName: sName,
                    family: family,
                    toxicSubstances: toxicSubstances,
                    toxicOrgans: toxicOrgans,
                    symptoms: symptoms,
                    proneSpecies: proneSpecies,
                    // N'incluez pas l'imageFilename ici pour ne pas la mettre à jour
                }, {
                    merge: true
                });

                console.log("Document updated");
                setIsPending(false);
                history.push('/plant/' + id);
            } catch (error) {
                console.error("Error updating document:", error);
            }
        }
    };

    const backToPlantDetails = () => {
        history.push("/plant/"+id)
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>

                    <IonItem slot="start" id="add-plant" button={true} onClick={backToPlantDetails} lines="none">
                        <IonIcon icon={arrowBackOutline} />
                    </IonItem>
                    <IonTitle>Modifier : {vName}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                <form onSubmit={handleSubmit}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" size-md="6" size-lg="4">
                                <IonItem>
                                    <IonLabel position="stacked">Nom vernaculaire</IonLabel>
                                    <IonInput
                                        required
                                        aria-label="Nom vernaculaire"
                                        value={vName}
                                        onIonChange={(e) => setVName(e.detail.value)}
                                    ></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Nom scientifique</IonLabel>
                                    <IonInput
                                        type="text"
                                        required
                                        aria-label="Nom scientifique"
                                        value={sName}
                                        onIonChange={(e) => setSName(e.detail.value)}
                                    ></IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6" size-lg="4">
                                <IonItem>
                                    <IonLabel position="stacked">Famille</IonLabel>
                                    <IonInput
                                        type="text"
                                        required
                                        aria-label="Famille"
                                        value={family}
                                        onIonChange={(e) => setFamily(e.detail.value)}
                                    ></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Substances toxiques</IonLabel>
                                    <IonInput
                                        type="text"
                                        required
                                        aria-label="Substances toxiques"
                                        value={toxicSubstances}
                                        onIonChange={(e) => setToxicSubstances(e.detail.value)}
                                    ></IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6" size-lg="4">
                                <IonItem>
                                    <IonLabel position="stacked">Organes toxiques</IonLabel>
                                    <IonInput
                                        type="text"
                                        required
                                        aria-label="Organes toxiques"
                                        value={toxicOrgans}
                                        onIonChange={(e) => setToxicOrgans(e.detail.value)}
                                    ></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Espèces vulnérables</IonLabel>
                                    <IonInput
                                        type="text"
                                        required
                                        aria-label="Espèces vulnérables"
                                        value={proneSpecies}
                                        onIonChange={(e) => setProneSpecies(e.detail.value)}
                                    ></IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol size="12" size-md="6" size-lg="4">
                                <IonCard>
                                    <img src={imageUrl} alt="" style={{maxHeight : "200px"}}/>
                                    <IonCardHeader>
                                        <IonLabel position="stacked">Image</IonLabel>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <input
                                            aria-label="Image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12">
                                <IonItem>
                                    <IonLabel position="stacked">Symptômes</IonLabel>
                                    <IonInput
                                        type="text"
                                        required
                                        value={symptoms}
                                        onIonChange={(e) => setSymptoms(e.detail.value)}
                                    ></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    {!isPending && <IonButton type="submit">Valider</IonButton>}
                    {isPending && <IonButton disabled>Validation...</IonButton>}
                </form>
                    )}
            </IonContent>
        </>
    );
}

export default EditPlant;