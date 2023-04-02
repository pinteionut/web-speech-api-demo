import Card from "../Components/UI/Card";
import Heading from "../Components/UI/Heading";

const DEMOS = [
  {
    title: "Speech Synthesis",
    description: "Speech Synthesis demo and capabilities",
    path: "/speech-synthesis",
  },
  {
    title: "Speech Recognition",
    description: "Speech Recognition demo and capabilites",
    path: "/speech-recognition",
  },
];

const USE_CASES = [
  {
    title: "Reading",
    description: "Speech Synthesis reading a chapter",
    path: "/reading",
  },
  {
    title: "Translator",
    description: "Speech Synthesis translation",
    path: "/translator",
  },
  {
    title: "Voice Control",
    description: "Speech Recognition control",
    path: "/voice-control",
  },
  {
    title: "Parrot",
    description: "A funny parrot",
    path: "/parrot",
  },
];

const Homepage = () => {
  return (
    <>
      <Heading
        main="Web Speech API"
        additional="demos"
        subtext="Demo Applications for the Web Speech API"
      />
      <div className="grid gap-2 mt-5">
        {DEMOS.map((demo, index) => (
          <Card key={index} {...demo} />
        ))}
      </div>
      <Heading
        main="Use Cases"
        subtext="Real Life examples for the Web Speech API"
      />
      <div className="grid gap-2 mt-5">
        {USE_CASES.map((useCase, index) => (
          <Card key={index} {...useCase} />
        ))}
      </div>
    </>
  );
};

export default Homepage;
