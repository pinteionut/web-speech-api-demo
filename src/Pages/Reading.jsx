import { useState } from "react";
import Button from "../Components/UI/Button";
import Heading from "../Components/UI/Heading";
import Quote from "../Components/UI/Quote";
import useSpeechCancel from "../Hooks/useSpeechCancel";

const TEXT = `The Bell Telephone Laboratory's Voder (from Voice Operating Demonstrator) was the first attempt to electronically synthesize human speech by breaking it down into its acoustic components. It was invented by Homer Dudley in 1937–1938 and developed on his earlier work on the vocoder. The quality of the speech was limited; however, it demonstrated the synthesis of the human voice, which became one component of the vocoder used in voice communications for security and to save bandwidth.`;

const Reading = () => {
  useSpeechCancel();
  const [isReading, setIsReading] = useState(false);
  const [highlightedRange, setHighlightedRange] = useState();

  const readHandler = () => {
    setIsReading(true);
    const utterance = new SpeechSynthesisUtterance(TEXT);
    utterance.onboundary = (event) => {
      setHighlightedRange({
        from: event.charIndex,
        to: event.charIndex + event.charLength,
      });
    };
    utterance.onend = () => {
      setIsReading(false);
      setHighlightedRange();
    };
    window.speechSynthesis.speak(utterance);
  };

  const stopHandler = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setHighlightedRange();
  };

  return (
    <>
      <Heading main="Reading" />
      <Quote by="Wikipedia">
        {TEXT.split("").map((letter, index) => (
          <span
            key={index}
            className={`${
              highlightedRange &&
              index >= highlightedRange.from &&
              index <= highlightedRange.to
                ? " text-red-500"
                : ""
            }`}
          >
            {letter}
          </span>
        ))}
      </Quote>
      <div className="w-full text-center">
        <Button
          className="mt-10"
          onClick={isReading ? stopHandler : readHandler}
        >
          {isReading ? "Stop" : "Read"}
        </Button>
      </div>
    </>
  );
};

export default Reading;
