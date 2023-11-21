import {db} from "./firebase/firebase";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addDoc, collection} from "firebase/firestore";

export function AddPlant() {

    const [sName, setSName] = useState('');
    const [vName, setVName] = useState('');
    const [family, setFamily] = useState('');
    const [toxicSubstances, setToxicSubstances] = useState('');
    const [toxicOrgans, setToxicOrgans] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [proneSpecies, setProneSpecies] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true);

        // Add a new document in collection "cities"
        addDoc(collection(db, "plants"), {
            vernacularName: vName,
            scientificName: sName,
            family: family,
            toxicSubstances: toxicSubstances,
            toxicOrgans: toxicOrgans,
            symptoms: symptoms,
            proneSpecies: proneSpecies,
            imageUrl: imageUrl
        });

        setIsPending(false);

        navigate('/');
    }

    return (

        <form onSubmit={handleSubmit}>
            <label>Nom vernaculaire :</label>
            <input
                type="text"
                required
                value={vName}
                onChange={(e) => setVName(e.target.value)}
            />
            <label>Nom scientifique :</label>
            <input
                type="text"
                required
                value={sName}
                onChange={(e) => setSName(e.target.value)}
            />
            <label>Famille :</label>
            <input
                type="text"
                required
                value={family}
                onChange={(e) => setFamily(e.target.value)}
            />
            <label>Substances toxiques :</label>
            <input
                type="text"
                required
                value={toxicSubstances}
                onChange={(e) => setToxicSubstances(e.target.value)}
            />
            <label>Organes toxiques :</label>
            <input
                type="text"
                required
                value={toxicOrgans}
                onChange={(e) => setToxicOrgans(e.target.value)}
            />
            <label>Symptômes :</label>
            <input
                type="text"
                required
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
            />
            <label>Espèces vulnérables :</label>
            <input
                type="text"
                required
                value={proneSpecies}
                onChange={(e) => setProneSpecies(e.target.value)}
            />
            <label>Image :</label>
            <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            { !isPending && <button>Ajouter</button>}
            { isPending && <button disabled>Ajout de la plante...</button>}
        </form>
    )
}