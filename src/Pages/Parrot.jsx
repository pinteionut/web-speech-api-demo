import Heading from "../Components/UI/Heading";
import ParrotStanding from "../assets/parrot-standing.gif";
import ParrotTalking from "../assets/parrot-talking.gif";
import Button from "../Components/UI/Button";
import { useEffect, useState } from "react";
import useVoices from "../Hooks/useVoices";

const recognition = new window.webkitSpeechRecognition();
const { speechSynthesis } = window;

const Parrot = () => {
  const voices = useVoices();
  const [started, setStarted] = useState(false);
  const [parrotTalking, setParrotTalking] = useState(false);

  useEffect(() => {
    return () => {
      recognition.abort();
    };
  }, []);

  if (!voices) return null;

  const prefferedVoice = voices.find(
    (voice) => voice.voiceURI == "Google UK English Male"
  );

  const startUserSpeak = () => {
    recognition.abort();
    setStarted(true);
    recognition.continuous = true;
    recognition.start();

    recognition.onresult = (event) => {
      const utterance = new SpeechSynthesisUtterance(
        event.results[event.results.length - 1][0].transcript
      );
      setParrotTalking(true);
      utterance.pitch = 2;
      utterance.voice = prefferedVoice;

      utterance.onend = () => {
        setParrotTalking(false);
      };
      speechSynthesis.speak(utterance);
    };
  };

  const auch = () => {
    const utterance = new SpeechSynthesisUtterance("auch, that hurt!");
    setParrotTalking(true);
    utterance.pitch = 2;
    utterance.voice = prefferedVoice;
    setParrotTalking(true);
    utterance.onend = () => {
      setParrotTalking(false);
    };
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <Heading main="Parrot" />
      <div className="text-center">
        <img
          src={parrotTalking ? ParrotTalking : ParrotStanding}
          className="mx-auto"
          onClick={auch}
        />
        {started ? null : <Button onClick={startUserSpeak}>Start</Button>}
      </div>
    </>
  );
};

export default Parrot;
