import { useState } from "react";
import Button from "../Components/UI/Button";
import Heading from "../Components/UI/Heading";
import Input from "../Components/UI/Input";
import Quote from "../Components/UI/Quote";
import SearchableDropdown from "../Components/UI/SearchableDropdown";
import Toggle from "../Components/UI/Toggle";
import LANGUAGES from "../constants/bcp_languages";
import Status from "../Components/UI/Status";

const recognition = new window.webkitSpeechRecognition();

const SpeechRecognition = () => {
  const [speechStarted, setSpeechStarted] = useState();
  const [continuous, setContinuous] = useState();
  const [interim, setInterim] = useState();
  const [maxAlternatives, setMaxAlternatives] = useState(1);
  const [language, setLanguage] = useState();
  const [result, setResult] = useState();
  const [audioDetected, setAudioDetected] = useState();
  const [soundDetected, setSoundDetected] = useState();

  const start = () => {
    abort();

    if (language) {
      recognition.lang = language;
    }

    recognition.continuous = continuous;
    recognition.interimResults = interim;
    recognition.maxAlternatives = maxAlternatives;

    recognition.onresult = (event) => {
      setResult(event.results[event.results.length - 1]);
    };

    recognition.onaudiostart = () => {
      setAudioDetected(true);
    };

    recognition.onaudioend = () => {
      setAudioDetected(false);
    };

    recognition.onsoundstart = () => {
      setSoundDetected(true);
    };

    recognition.onsoundend = () => {
      setSoundDetected(false);
    };

    recognition.onspeechend = () => {
      setSpeechStarted(false);
    };

    recognition.onspeechstart = () => {
      setSpeechStarted(true);
    };

    recognition.start();
  };

  const abort = () => {
    recognition.abort();
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage.main);
  };

  return (
    <>
      <Heading main="Speech Recognition" />
      <div className="mt-10 border-y p-3 flex items-center">
        <div>
          <span className="font-bold">Language:</span>
          <span className="ml-2">{language || "default"}</span>
        </div>
        <div className="ml-auto">
          <SearchableDropdown
            title="Language"
            options={LANGUAGES.map((language) => ({
              main: language.code,
              desc: language.text,
            }))}
            onSelect={changeLanguage}
          />
        </div>
      </div>
      <div className="border-b flex items-center p-3">
        <span className="font-bold">Continuous</span>
        <div className="ml-auto">
          <Toggle
            onChange={() => setContinuous((prevContinuous) => !prevContinuous)}
          />
        </div>
      </div>
      <div className="border-b flex items-center p-3">
        <span className="font-bold">Interim Results</span>
        <div className="ml-auto">
          <Toggle
            onChange={() => setInterim((prevIntermin) => !prevIntermin)}
          />
        </div>
      </div>
      <div className="border-b flex items-center p-3">
        <span className="font-bold">Max Alternatives</span>
        <div className="ml-auto">
          <Input
            type="number"
            extra={{ min: 1 }}
            value={maxAlternatives}
            onChange={(e) => setMaxAlternatives(+e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center p-3">
        <span className="font-bold">Audio</span>
        <div className="ml-auto">
          <Status
            message={audioDetected ? "Detected" : "Not Detected"}
            color={audioDetected ? "green" : "gray"}
          />
        </div>
      </div>
      <div className="flex items-center p-3">
        <span className="font-bold">Sound</span>
        <div className="ml-auto">
          <Status
            message={soundDetected ? "Detected" : "Not Detected"}
            color={soundDetected ? "green" : "gray"}
          />
        </div>
      </div>
      <div className="border-b flex items-center p-3">
        <span className="font-bold">Speech</span>
        <div className="ml-auto">
          <Status
            message={speechStarted ? "Detected" : "Not Detected"}
            color={speechStarted ? "green" : "gray"}
          />
        </div>
      </div>
      {result ? (
        <>
          <Quote
            by="The person that just spoke"
            className={result.isFinal ? "" : "text-red-200"}
          >
            {result[0].transcript}
          </Quote>
          <div className="mt-5">
            <div className="mb-1">
              Confidence: {parseInt(result[0].confidence * 100)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  result[0].confidence < 0.5
                    ? "bg-red-500"
                    : result[0].confidence < 0.8
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${parseInt(result[0].confidence * 100)}%` }}
              ></div>
            </div>
          </div>
          {result.length > 1 ? (
            <div className="mt-5">
              <div className="mb-2 text-lg font-semibold text-gray-900">
                Alternatives
              </div>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                {Object.keys(result)
                  .slice(1, result.length)
                  .map((alternativeKey) => (
                    <li key={alternativeKey}>
                      {result[alternativeKey].transcript}
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}
        </>
      ) : null}
      <div className="w-full text-center">
        {audioDetected ? (
          <Button onClick={abort} className="mt-10">
            Abort
          </Button>
        ) : (
          <Button onClick={start} className="mt-10">
            Speak
          </Button>
        )}
      </div>
    </>
  );
};

export default SpeechRecognition;
