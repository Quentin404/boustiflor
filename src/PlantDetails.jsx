import {useEffect, useState} from "react";
import {doc, deleteDoc, onSnapshot} from "firebase/firestore";
import {db} from "./firebase/firebase";
import {Link, useNavigate, useParams} from "react-router-dom";

const PlantDetails = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "plants", id), (doc) => {
            setPlant(doc.data())
            setLoading(false); // Data has been loaded, set loading to false
        });

        return () => {
            unsubscribe(); // Unsubscribe when the component unmounts
        };
    }, []);

    const handleDelete = () => {
        deleteDoc(doc(db, "plants", id));
        navigate('/');
    }

    return (
        <div>
            <h1>Plants:</h1>
            {loading ? (
                <p>Loading...</p> // Display a loading message while fetching data
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
                        </tr>
                    </tbody>
                </table>
            )}
            <Link to={`/plant/edit/${id}`}>Modifier</Link>
            <button onClick={handleDelete}>Supprimer</button>
        </div>
    );
}

export default PlantDetails;