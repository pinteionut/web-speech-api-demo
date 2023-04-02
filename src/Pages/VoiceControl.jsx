import Heading from "../Components/UI/Heading";
import List from "../Components/List/List";
import Toggle from "../Components/UI/Toggle";
import { useState } from "react";

const recognition = new window.webkitSpeechRecognition();

const VoiceControl = () => {
  const [isActive, setIsActive] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState();

  const addItem = (item) => {
    setItems((prevItems) => {
      if (prevItems.find(({ text }) => text == item)) {
        setError(`"${item}" already in list.`);
        return prevItems;
      } else {
        const newItems = [...prevItems];
        newItems.push({ text: item, done: false });

        return newItems;
      }
    });
  };

  const removeItem = (item) => {
    setItems((prevItems) => {
      if (prevItems.find(({ text }) => text == item)) {
        const newItems = prevItems.filter(({ text }) => text !== item);

        return newItems;
      } else {
        setError(`"${item}" not in list.`);
        return prevItems;
      }
    });
  };

  const checkItem = (item) => {
    setItems((prevItems) => {
      const doneItemIndex = prevItems.findIndex(({ text }) => text === item);
      if (doneItemIndex != -1) {
        const newItems = [...prevItems];
        newItems[doneItemIndex] = {
          text: prevItems[doneItemIndex].text,
          done: true,
        };

        return newItems;
      } else {
        setError(`"${item}" not in list.`);
        return prevItems;
      }
    });
  };

  const executeCommand = (command) => {
    setError();

    const splittedCommand = command.trim().split(" ");
    if (
      splittedCommand.length > 1 &&
      splittedCommand[0].toLowerCase() === "add"
    ) {
      splittedCommand.shift();
      addItem(splittedCommand.join(" "));
      return;
    } else if (
      splittedCommand.length > 1 &&
      splittedCommand[0].toLowerCase() === "remove"
    ) {
      splittedCommand.shift();
      removeItem(splittedCommand.join(" "));
      return;
    } else if (
      splittedCommand.length > 1 &&
      splittedCommand[0].toLowerCase() === "check"
    ) {
      splittedCommand.shift();
      checkItem(splittedCommand.join(" "));
      return;
    } else if (
      splittedCommand.length === 1 &&
      // On Edge a "." is added at the end
      splittedCommand[0].toLowerCase().replace(".", "") === "reset"
    ) {
      setItems([]);
      return;
    }

    setError(`"${command.trim()}" is not a valid comand.`);
  };

  const toggleVoiceControl = () => {
    if (isActive) {
      recognition.abort();
      setIsActive(false);
    } else {
      recognition.continuous = true;
      recognition.onresult = (event) => {
        executeCommand(event.results[event.results.length - 1][0].transcript);
      };
      recognition.start();
      setIsActive(true);
    }
  };

  return (
    <>
      <Heading main="Voice Control" />
      <List title="To Do" items={items} />
      {error ? <div className="mt-5 text-red-500">{error}</div> : null}
      <div className="mt-10 border p-3">
        <div className="flex items-center my-3">
          <span className="mr-2">Enable Voice Control:</span>
          <Toggle onChange={toggleVoiceControl} />
        </div>
        <hr className="mb-2" />
        Commands:
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
          <li>
            <span className="text-red-500">Add</span> item
          </li>
          <li>
            <span className="text-red-500">Remove</span> item
          </li>
          <li>
            <span className="text-red-500">Check</span> item
          </li>
          <li>
            <span className="text-red-500">Reset</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VoiceControl;
