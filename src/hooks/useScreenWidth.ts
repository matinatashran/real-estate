"use client";
import { useState, useEffect } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number | undefined>();

  useEffect(() => {
    const handleRezise = () => {
      setScreenWidth(window.innerWidth);
    };

    handleRezise();

    window.addEventListener("resize", handleRezise);
    return window.removeEventListener("resize", handleRezise);
  }, []);

  return screenWidth ||0;
};

export default useScreenWidth;
