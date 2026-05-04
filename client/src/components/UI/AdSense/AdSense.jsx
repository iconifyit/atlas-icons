import { useEffect } from "react";
import React from "react";

// declare global {
//   interface Window {
//     adsbygoogle: {
//       push: (config?: any) => void;
//     };
//   }
// }
// cssStyles
const AdSense = () => {
  useEffect(() => {
    // Check if adsbygoogle is loaded and not already initialized
    if (window.adsbygoogle) {
      try {
        window.adsbygoogle.push({}); // Push empty config object
      } catch (error) {
        console.error("AdSense push error:", error);
      }
    }
  }, []);

  return (
    <div className="adsbygoogle-container">
      <ins
        className="adsbygoogle"
        data-ad-client="ca-pub-7802308896513994"
        data-ad-slot="7033660673"
        style={{ display: "block", width: "256px", height: "256px" }}
      ></ins>
    </div>
  );
};

export default AdSense;
