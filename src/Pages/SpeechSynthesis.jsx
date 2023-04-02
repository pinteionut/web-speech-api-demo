import { useState, useEffect, useRef } from "react";
import Select from "../Components/UI/Select";
import Heading from "../Components/UI/Heading";
import Steps from "../Components/UI/Steps";
import TextArea from "../Components/UI/TextArea";
import useVoices from "../Hooks/useVoices";
import Preloader from "../Components/UI/Preloader";
import Slider from "../Components/UI/Slider";
import Button from "../Components/UI/Button";
import Status from "../Components/UI/Status";
import useSpeechCancel from "../Hooks/useSpeechCancel";
const { speechSynthesis } = window;

const STATUSES = {
  default: {
    message: "Waiting for interaction",
    color: "gray",
  },
  speaking: {
    message: "Speaking",
    color: "green",
  },
  paused: {
    message: "Paused",
    color: "yellow",
  },
  cancelled: {
    message: "Cancelled",
    color: "red",
  },
};

const SpeechSynthesis = () => {
  useSpeechCancel();
  const [message, setMessage] = useState();
  const [voice, setVoice] = useState();
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [status, setStatus] = useState(STATUSES.default);
  const [currentWord, setCurrentWord] = useState();

  const availableVoices = useVoices();

  const steps = [
    {
      title: "Message",
      details: "Enter a message",
      completed: !!message,
    },
    {
      title: "Voice",
      details: "Select a voice",
      completed: !!voice,
    },
    {
      title: "Adjust",
      details: "Adjust the voice",
      completed: !!voice,
    },
    {
      title: "Enjoy!",
      details: "Control the voice",
    },
  ];

  const voiceChangeHandler = (e) => {
    const voice = availableVoices[e.target.value];
    setVoice(voice);
    if (!voice?.localService) {
      setRate(1);
    }
  };

  const speakHandler = () => {
    // To make sure that it is not stuck on a previous speak
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = voice;
    utterance.lang = voice?.lang;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    utterance.onstart = () => {
      setStatus(STATUSES.speaking);
      if (voice.localService) {
        setCurrentWord(message.split(" ")[0]);
      }
    };

    // Only for localService voices
    utterance.onboundary = (event) => {
      if (event.charIndex && event.charLength) {
        setCurrentWord(
          message.slice(event.charIndex, event.charIndex + event.charLength)
        );
      }
    };

    utterance.onend = () => {
      setStatus(STATUSES.default);
      setCurrentWord();
    };

    // Only works for localService voices
    // utterance.onpause = () => {
    //   setStatus(STATUSES.paused);
    // };
    // utterance.onresume = () => {
    //   setStatus(STATUSES.speaking);
    // };

    speechSynthesis.speak(utterance);
  };

  const pauseHandler = () => {
    speechSynthesis.pause();
    setStatus(STATUSES.paused);
  };

  const resumeHandler = () => {
    speechSynthesis.resume();
    setStatus(STATUSES.speaking);
  };

  const cancelHandler = () => {
    speechSynthesis.cancel();
    setStatus(STATUSES.cancelled);
    setTimeout(() => setStatus(STATUSES.default), 500);
    setCurrentWord();
  };

  return (
    <>
      <Heading main="Speech Synthesis" />
      {availableVoices ? (
        <div className="mt-10 flex space-between">
          <Steps steps={steps} maxHeight="19rem" />
          <form className="ml-10 w-full">
            <TextArea
              label="Message"
              placeholder="Hello world!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <br />
            <Select
              label="Select a Voice"
              options={availableVoices.map((availableVoice, index) => ({
                text: availableVoice.voiceURI,
                value: index,
              }))}
              onChange={voiceChangeHandler}
            />
            {voice ? (
              <>
                <Slider
                  label="Pitch"
                  value={pitch}
                  onChange={(e) => setPitch(+e.target.value)}
                  min="0"
                  max="2"
                  step="0.1"
                  className="mt-5"
                />
                {voice.localService ? (
                  <>
                    <Slider
                      label="Rate"
                      value={rate}
                      onChange={(e) => setRate(+e.target.value)}
                      min="0.1"
                      max="10"
                      step="0.1"
                      className="mt-5"
                    />
                  </>
                ) : null}
                <Slider
                  label="Volume"
                  value={volume}
                  onChange={(e) => setVolume(+e.target.value)}
                  min="0"
                  max="1"
                  step="0.1"
                  className="mt-5"
                />
                <div className="mt-10">
                  <Status {...status} />
                  <span className="ml-5 font-bold text-3xl">{currentWord}</span>
                </div>
                <Button className="mt-10" onClick={speakHandler}>
                  Speak
                </Button>
                {status === STATUSES.speaking ? (
                  <Button className="mt-10" onClick={pauseHandler}>
                    Pause
                  </Button>
                ) : null}
                {status === STATUSES.paused ? (
                  <Button className="mt-10" onClick={resumeHandler}>
                    Resume
                  </Button>
                ) : null}
                {status === STATUSES.speaking ? (
                  <Button className="mt-10" onClick={cancelHandler}>
                    Cancel
                  </Button>
                ) : null}
              </>
            ) : null}
          </form>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default SpeechSynthesis;
