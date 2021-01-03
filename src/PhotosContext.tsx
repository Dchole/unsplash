import { createContext, useEffect, useState } from "react";
import firebase from "@/lib/firebase-config";

export interface IPhoto {
  id: string;
  label: string;
  photoURL: string;
}

interface IPhotosContextProps {
  photos: IPhoto[];
  searchOptions: string[];
  handleFilter: (label: string) => void;
}

export const PhotosContext = createContext({} as IPhotosContextProps);

const PhotosContextProvider = ({ children }) => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [filter, setFilter] = useState("");
  const [searchOptions, setSearchOptions] = useState<string[]>([]);

  const handleFilter = (label: string) => setFilter(label);

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

        filter
          ? setPhotos(
              data.filter(photo =>
                photo.label.toLowerCase().includes(filter.toLowerCase())
              )
            )
          : setPhotos(data);

        setSearchOptions(data.map(photo => photo.label));
      });
    } catch (error) {
      console.log(error);
    }
  }, [filter]);

  return (
    <PhotosContext.Provider value={{ photos, searchOptions, handleFilter }}>
      {children}
    </PhotosContext.Provider>
  );
};

export default PhotosContextProvider;
