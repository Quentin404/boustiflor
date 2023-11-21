import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";

const EditPlant = () => {
    const { id } = useParams();
    const [sName, setSName] = useState('');
    const [vName, setVName] = useState('');
    const [family, setFamily] = useState('');
    const [toxicSubstances, setToxicSubstances] = useState('');
    const [toxicOrgans, setToxicOrgans] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [proneSpecies, setProneSpecies] = useState('');
    const [loading, setLoading] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "plants", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log("Document data:", data);
                setVName(data.vernacularName);
                setSName(data.scientificName);
                setFamily(data.family);
                setToxicSubstances(data.toxicSubstances);
                setToxicOrgans(data.toxicOrgans);
                setSymptoms(data.symptoms);
                setProneSpecies(data.proneSpecies);
            } else {
                console.log("No such document!");
            }

            setLoading(false);
        };

        fetchData();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true);

        setDoc(doc(db, "plants", id), {
            vernacularName: vName,
            scientificName: sName,
            family: family,
            toxicSubstances: toxicSubstances,
            toxicOrgans: toxicOrgans,
            symptoms: symptoms,
            proneSpecies: proneSpecies,
        }, {
            merge: true
        }).then(() => {
            console.log("Document updated");
            setIsPending(false);
            navigate('/plant/'+id);
        });
    }

    return (
        <div>
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
                {!isPending && <button>Valider</button>}
                {isPending && <button disabled>Validation...</button>}
            </form>
        </div>
    );
}

export default EditPlant;