import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "./useAuth"

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const { user } = useAuth()

  const startUpload = (file, title, category) => {
    if (!file) {
      return;
    }

    const fileId = uuidv4();
    const formatOfFile = file.type.split("/")[1];

    const storageRef = ref(storage, `images/${fileId}.${formatOfFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
      },
      (error) => {
        setError(error)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        setProgress(progress)

        await addDoc(collection(db, "images"), {
          imageUrl: downloadURL,
          userEmail: user.email,
          title: title,
          category: category
        });
      }
    );
  };

  return { progress, error, startUpload };
};

export default useStorage;
