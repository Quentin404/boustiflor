import {db} from "./firebase/firebase";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addDoc, collection} from "firebase/firestore";
import {snakeCase} from "lodash";
import {getStorage, ref, uploadBytes} from "firebase/storage";

export function AddPlant() {

    const [sName, setSName] = useState('');
    const [vName, setVName] = useState('');
    const [family, setFamily] = useState('');
    const [toxicSubstances, setToxicSubstances] = useState('');
    const [toxicOrgans, setToxicOrgans] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [proneSpecies, setProneSpecies] = useState('');
    const [image, setImage] = useState(null);  // State to store the selected image file
    const [imageUrl, setImageUrl] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

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

            // Rename the base name to snake_case using lodash
            const snakeCaseName = snakeCase(sName);

            // Create the new file name by combining the snake_case base name and the original extension
            const fileName = `${snakeCaseName}.${extension}`;

            const storage = getStorage();
            const storageRef = ref(storage, `img/plants/${fileName}`);

            try {
                await uploadBytes(storageRef, image);
                setImageUrl(fileName);

                await addDoc(collection(db, "plants"), {
                    vernacularName: vName,
                    scientificName: sName,
                    family: family,
                    toxicSubstances: toxicSubstances,
                    toxicOrgans: toxicOrgans,
                    symptoms: symptoms,
                    proneSpecies: proneSpecies,
                    imageUrl: fileName // Use the fileName here
                });

                console.log("Document updated");
                setIsPending(false);
                navigate('/');
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload the image first
        await handleImageUpload();

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
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
            />
            { !isPending && <button>Ajouter</button>}
            { isPending && <button disabled>Ajout de la plante...</button>}
        </form>
    )
}