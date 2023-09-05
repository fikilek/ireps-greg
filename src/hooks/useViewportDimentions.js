import { useEffect } from "react";
import { useState } from "react";

export const useViewportDimensions = () => {

	const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  
	const updateDimensions = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
  };
  
	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const getViewportDimensions = () => {
    return {width, height}
  }
  
  return { getViewportDimensions };
};

