import { useEffect, useState } from "react";

const useScroll = () => {
  const [elevate, setElevate] = useState(false);

  const handleScroll = () => {
    pageYOffset >= 50 ? setElevate(true) : setElevate(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return elevate;
};

export default useScroll;
