import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "./firebase/firebase";
import {Link} from "react-router-dom";

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const q = query(collection(db, "plants"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedPlants = []; // Create a new array to hold the updated data
            querySnapshot.forEach((doc) => {
                const id = doc.id
                updatedPlants.push({...doc.data(), id});
            });
            setPlants(updatedPlants);
            setLoading(false); // Data has been loaded, set loading to false
        });

        return () => {
            unsubscribe(); // Unsubscribe when the component unmounts
        };
    }, []);

    console.log(plants)

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
                        {plants.map((item, index) => (
                                <tr key={index}>
                                    <Link to={`plant/${item.id}`}>
                                        <td>{item.vernacularName}</td>
                                    </Link>
                                    <td>{item.scientificName}</td>
                                    <td>{item.family}</td>
                                    <td>{item.toxicSubstances}</td>
                                    <td>{item.toxicOrgans}</td>
                                    <td>{item.symptoms}</td>
                                    <td>{item.proneSpecies}</td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PlantList;