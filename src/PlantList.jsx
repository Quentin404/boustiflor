import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "./firebase/firebase";

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const q = query(collection(db, "plants"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedPlants = []; // Create a new array to hold the updated data
            querySnapshot.forEach((doc) => {
                updatedPlants.push(doc.data());
            });
            setPlants(updatedPlants);
            setLoading(false); // Data has been loaded, set loading to false
        });

        return () => {
            unsubscribe(); // Unsubscribe when the component unmounts
        };
    }, []);

    return (
        <div>
            <h1>Plants:</h1>
            {loading ? (
                <p>Loading...</p> // Display a loading message while fetching data
            ) : (
                <ul>
                    {plants.map((item, index) => (
                        <li key={index}>{item.vernacularName} ({item.scientificName})</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PlantList;