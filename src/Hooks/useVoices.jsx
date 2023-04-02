import { useEffect, useState } from "react";

const useVoices = () => {
  const [voices, setVoices] = useState();

  // getVoices() returns an empty array the first time, that's why a callback is needed as well
  useEffect(() => {
    if (speechSynthesis.getVoices().length) {
      setVoices(speechSynthesis.getVoices());
    } else {
      speechSynthesis.onvoiceschanged = () => {
        setVoices(speechSynthesis.getVoices());
      };
    }
  }, []);

  return voices;
};

export default useVoices;
