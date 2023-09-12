import { collection, getCountFromServer, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const { user } = useAuth();

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
            const category = doc.data().category

            images.push({ imageUrl, title, email, category })
          });
          setDocs(images)
          setIsLoading(false)
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    };

    const getItemCount = async () => {
      const coll = collection(db, collectionName);
      const q = query(coll, where("userEmail", "==", user.email));
      const snapshot = await getCountFromServer(q);
      setItemCount(snapshot.data().count)
    }

    getData()
    getItemCount()

    return () => unsubscribe && unsubscribe()
  }, [collectionName, user.email]);

  return { docs, isLoading, itemCount };
};

export default useFirestore;
