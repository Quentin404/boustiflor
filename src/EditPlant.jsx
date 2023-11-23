import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {db, getUrl} from "./firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import {uploadBytes, getStorage, ref} from "firebase/storage";
import  {snakeCase} from "lodash"

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
    const navigate = useNavigate();

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

            // Rename the base name to snake_case using lodash
            const snakeCaseName = snakeCase(sName);

            // Create the new file name by combining the snake_case base name and the original extension
            const fileName = `${snakeCaseName}.${extension}`;

            const storage = getStorage();
            const storageRef = ref(storage, `img/plants/${fileName}`);

            try {
                await uploadBytes(storageRef, image);
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
                navigate('/plant/'+id);
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
                <label>Image :</label>
                <img className="plant-image" src={imageUrl} alt="" />
                <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                />
                {!isPending && <button>Valider</button>}
                {isPending && <button disabled>Validation...</button>}
            </form>
        </div>
    );
}

export default EditPlant;