import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Header from "@/components/Header";
import PhotoListing from "@/components/PhotoListing";

export interface IPhoto {
  _id: string;
  label: string;
  photo: string;
}

export interface IPhotos {
  photos: IPhoto[];
}

export const getStaticProps: GetStaticProps<IPhotos> = async () => {
  const data = await fetch(
    `https://pixabay.com/api/?key=${process.env.API_KEY}`
  ).then(res => res.json());

  const photos: IPhoto[] = data.hits.map((photo: Record<string, any>) => ({
    _id: photo.id,
    label: "Morbi consequat lectus non orci maximus",
    photo: photo.largeImageURL
  }));

  return { props: { photos } };
};

const Index: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  photos
}) => {
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
