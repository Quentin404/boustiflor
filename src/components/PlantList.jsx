import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { getUrl } from "../firebase/firebase.js";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonRow, IonSearchbar, IonSelect, IonSelectOption
} from "@ionic/react";
import {searchCircle} from "ionicons/icons";

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [plantUrls, setPlantUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchField, setSearchField] = useState("vernacularName"); // Default search field is vernacularName

    useEffect(() => {
        const q = query(collection(db, "plants"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedPlants = [];
            querySnapshot.forEach((doc) => {
                const id = doc.id;
                updatedPlants.push({ ...doc.data(), id });
            });
            setPlants(updatedPlants);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const getImgUrls = async () => {
            const imgUrls = [];
            for (const plant of plants) {
                const url = await getUrl("img/plants/", plant.imageFilename);
                imgUrls.push(url);
            }
            setPlantUrls(imgUrls);
        };

        getImgUrls();
    }, [plants]);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const filteredPlants = plants.filter((plant) =>
        plant[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonCol size="12" size-sm="4" size-lg="2">
                        <IonSelect label="Rechercher par" labelPlacement="floating" interface="popover" id="searchField" onIonChange={handleSearchFieldChange} value={searchField}>
                            <IonSelectOption value="vernacularName" default>Nom vernaculaire</IonSelectOption>
                            <IonSelectOption value="scientificName">Nom scientifique</IonSelectOption>
                            <IonSelectOption value="family">Famille</IonSelectOption>
                            <IonSelectOption value="toxicSubstances">Substances toxiques</IonSelectOption>
                            <IonSelectOption value="toxicOrgans">Organes toxiques</IonSelectOption>
                            <IonSelectOption value="symptoms">Symptômes</IonSelectOption>
                            <IonSelectOption value="proneSpecies">Espèces vulnérables</IonSelectOption>
                        </IonSelect>
                    </IonCol>
                    <IonCol size="12" size-sm="8" size-lg="10">
                        <IonSearchbar searchIcon={searchCircle} placeholder='Rechercher une plante toxique' value={searchTerm} onIonInput={handleSearchTermChange}></IonSearchbar>
                    </IonCol>
                </IonRow>
            </IonGrid>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <IonGrid>
                    <IonRow>
                    {filteredPlants.map((item, index) => (
                        <IonCol size="12" size-sm="6" size-md="4" size-lg="2" key={index}>
                            <Link to={`plant/${item.id}`}>
                                <IonCard className="plant-card">
                                    <img className="plant-image" src={plantUrls[index]} alt=""/>
                                    <IonCardHeader>
                                        <IonCardTitle>{item.vernacularName}</IonCardTitle>
                                        <IonCardSubtitle>{item.scientificName}</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>Toxique pour : {item.proneSpecies}</IonCardContent>
                                </IonCard>
                            </Link>
                        </IonCol>
                    ))}
                    </IonRow>
                </IonGrid>
            )}
        </>
    );
};

export default PlantList;
