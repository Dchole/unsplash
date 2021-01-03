import Head from "next/head";
import Header from "@/components/Header";
import PhotoListing from "@/components/PhotoListing";

const Index = () => {
  return (
    <>
      <Head>
        <title>Welcome to Unsplash</title>
      </Head>
      <Header />
      <PhotoListing />
    </>
  );
};

export default Index;
