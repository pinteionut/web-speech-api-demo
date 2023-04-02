import { useState } from "react";
import Button from "../Components/UI/Button";
import Heading from "../Components/UI/Heading";
import Preloader from "../Components/UI/Preloader";
import Select from "../Components/UI/Select";
import TextArea from "../Components/UI/TextArea";
import useSpeechCancel from "../Hooks/useSpeechCancel";
import useVoices from "../Hooks/useVoices";

const Translator = () => {
  useSpeechCancel();
  const [message, setMessage] = useState();
  const [fromLanguage, setFromLanguage] = useState();
  const [toLanguage, setToLanguage] = useState();
  const [translatedMessage, setTranslatedMessage] = useState();

  const voices = useVoices();

  if (!voices) return <Preloader />;

  const languages = [...new Set(voices.map((voice) => voice.lang))].map(
    (language) => ({
      value: language,
      text: language,
    })
  );

  const translate = async () => {
    let url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
      fromLanguage +
      "&tl=" +
      toLanguage +
      "&dt=t&q=" +
      encodeURI(message);
    const response = await fetch(url);
    const json = await response.json();

    setTranslatedMessage(json[0].map((result) => result[0]));
  };

  const listen = () => {
    const { speechSynthesis } = window;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(translatedMessage);
    utterance.voice = voices.filter((voice) => voice.lang === toLanguage)[0];
    utterance.lang = toLanguage;

    speechSynthesis.speak(utterance);
  };

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    setTranslatedMessage();
  };

  return (
    <>
      <Heading main="Translator" />
      <div className="flex items-center space-between">
        <div className="w-6/12">
          <TextArea
            label="Message"
            placeholder="Hello world!"
            value={message}
            onChange={messageChangeHandler}
          />
          <br />
          <Select
            label="From"
            options={languages}
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
          />
          <br />
          <Select
            label="To"
            options={languages}
            value={toLanguage}
            onChange={(e) => setToLanguage(e.target.value)}
          />
          {message && fromLanguage && toLanguage ? (
            <Button className="mt-10" onClick={translate}>
              Translate
            </Button>
          ) : null}
        </div>
        <div className="ml-auto w-5/12 text-center">
          <p>{translatedMessage}</p>
          {translatedMessage ? (
            <Button className="mt-10" onClick={listen}>
              Listen
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Translator;
