import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Header from "@/components/Header";
import PhotoListing from "@/components/PhotoListing";
import admin from "@/lib/firebase-admin-config";

export interface IPhoto {
  _id: string;
  label: string;
  photo: string;
}

export interface IPhotos {
  photos: IPhoto[];
}

export const getServerSideProps: GetServerSideProps<IPhotos> = async () => {
  const pixabay = await fetch(
    `https://pixabay.com/api/?key=${process.env.API_KEY}`
  ).then(res => res.json());

  const photos: IPhoto[] = pixabay.hits.map((photo: Record<string, any>) => ({
    _id: photo.id,
    label: "Morbi consequat lectus non orci maximus",
    photo: photo.largeImageURL
  }));

  let data: FirebaseFirestore.DocumentData[] = [];

  const snapshot = await admin.firestore().collection("images").get();

  snapshot.forEach(doc => {
    data.push({ _id: doc.id, ...doc.data() });
  });

  console.log(data);

  return { props: { photos } };
};

const Index: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ photos }) => {
  return (
    <>
      <Head>
        <title>Welcome to Unsplash</title>
      </Head>
      <Header />
      <PhotoListing photos={photos} />
    </>
  );
};

export default Index;
