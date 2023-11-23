import { useEffect, useState } from "react";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUrl } from "./firebase/firebase.js"
import {getStorage, ref, deleteObject} from "firebase/storage";

const PlantDetails = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
        navigate("/");
    };

    return (
        <div>
            <h1>Plants:</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Nom vernaculaire</th>
                        <th>Nom scientifique</th>
                        <th>Famille</th>
                        <th>Substances toxiques</th>
                        <th>Organes toxiques</th>
                        <th>Symptômes</th>
                        <th>Espèces vulnérables</th>
                        <th>Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{plant.vernacularName}</td>
                        <td>{plant.scientificName}</td>
                        <td>{plant.family}</td>
                        <td>{plant.toxicSubstances}</td>
                        <td>{plant.toxicOrgans}</td>
                        <td>{plant.symptoms}</td>
                        <td>{plant.proneSpecies}</td>
                        <td>
                            <img className="plant-image" src={imageUrl} alt="" />
                        </td>
                    </tr>
                    </tbody>
                </table>
            )}
            <Link to={`/plant/edit/${id}`}>Modifier</Link>
            <button onClick={handleDelete}>Supprimer</button>
        </div>
    );
};

export default PlantDetails;
