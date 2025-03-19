import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Title() {
  const location = useLocation();

  useEffect(() => {
    const pageName = location.pathname.replace("/", "") || "Home";
    document.title = `Abroad Education | ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`;
  }, [location]);

  return null; // This component doesn't need to render anything
}

export default Title;
