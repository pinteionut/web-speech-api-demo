import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/UI/Layout";
import Homepage from "./Pages/Homepage";
import Parrot from "./Pages/Parrot";
import Reading from "./Pages/Reading";
import SpeechRecognition from "./Pages/SpeechRecognition";
import SpeechSynthesis from "./Pages/SpeechSynthesis";
import Translator from "./Pages/Translator";
import VoiceControl from "./Pages/VoiceControl";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/speech-synthesis",
        element: <SpeechSynthesis />,
      },
      {
        path: "/reading",
        element: <Reading />,
      },
      {
        path: "/translator",
        element: <Translator />,
      },
      {
        path: "/speech-recognition",
        element: <SpeechRecognition />,
      },
      {
        path: "/voice-control",
        element: <VoiceControl />,
      },
      {
        path: "/parrot",
        element: <Parrot />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
