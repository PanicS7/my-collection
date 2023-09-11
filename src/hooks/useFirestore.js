import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => null

    const getData = async () => {
      try {
        const q = query(collection(db, collectionName));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            const imageUrl = doc.data().imageUrl
            const title = doc.data().title
            const email = doc.data().userEmail

            images.push({ imageUrl, title, email })
          });
          setDocs(images)
          setIsLoading(false)
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    };

    getData()

    return () => unsubscribe && unsubscribe()
  }, [collectionName]);

  return { docs, isLoading };
};

export default useFirestore;
