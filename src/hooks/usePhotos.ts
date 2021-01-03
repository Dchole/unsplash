import { useEffect, useState } from "react";
import firebase from "@/lib/firebase-config";

export interface IPhoto {
  id: string;
  label: string;
  photoURL: string;
}

const usePhotos = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [searchOptions, setSearchOptions] = useState<string[]>([]);

  useEffect(() => {
    try {
      const db = firebase
        .firestore()
        .collection("images")
        .orderBy("date", "desc");

      db.onSnapshot(snapshot => {
        const data: IPhoto[] = [];

        snapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() } as IPhoto);
        });

        setPhotos(data);
        setSearchOptions(data.map(photo => photo.label));
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { photos, searchOptions };
};

export default usePhotos;
