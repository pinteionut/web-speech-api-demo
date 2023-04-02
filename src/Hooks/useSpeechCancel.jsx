import { useEffect } from "react";

const useSpeechCancel = () => {
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);
};

export default useSpeechCancel;
