import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { Link } from "react-router-dom";
import { getUrl } from "./firebase/firebase.js";

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
        plant[searchField].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Plants:</h1>
            <div>
                <label htmlFor="searchField">Champ de recherche:</label>
                <select id="searchField" onChange={handleSearchFieldChange} value={searchField}>
                    <option value="vernacularName">Nom vernaculaire</option>
                    <option value="scientificName">Nom scientifique</option>
                    <option value="family">Famille</option>
                    <option value="toxicSubstances">Substances toxiques</option>
                    <option value="toxicOrgans">Organes toxiques</option>
                    <option value="symptoms">Symptômes</option>
                    <option value="proneSpecies">Espèces vulnérables</option>
                </select>
                <label htmlFor="searchTerm">Recherche:</label>
                <input
                    type="text"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </div>
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
                    {filteredPlants.map((item, index) => (
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
                            <td>
                                <img className="plant-image" src={plantUrls[index]} alt="" />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PlantList;
