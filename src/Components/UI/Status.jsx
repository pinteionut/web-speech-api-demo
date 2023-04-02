const StatusRenderer = ({ message, color }) => {
  switch (color) {
    case "gray":
      return <GrayStatus message={message} />;
    case "green":
      return <GreenStatus message={message} />;
    case "yellow":
      return <YellowStatus message={message} />;
    case "red":
      return <RedStatus message={message} />;
    default:
      return null;
  }
};

export default StatusRenderer;

const Status = ({ message, mainClassName, bulletClassName }) => {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${mainClassName}`}
    >
      <span className={`w-2 h-2 mr-1 rounded-full ${bulletClassName}`}></span>
      {message}
    </span>
  );
};

const RedStatus = ({ message }) => {
  return (
    <Status
      message={message}
      mainClassName="bg-red-100 text-red-800"
      bulletClassName="bg-red-500"
    />
  );
};

const GrayStatus = ({ message }) => {
  return (
    <Status
      message={message}
      mainClassName="bg-gray-100 text-gray-800"
      bulletClassName="bg-gray-500"
    />
  );
};

const GreenStatus = ({ message }) => {
  return (
    <Status
      message={message}
      mainClassName="bg-green-100 text-green-800"
      bulletClassName="bg-green-500"
    />
  );
};

const YellowStatus = ({ message }) => {
  return (
    <Status
      message={message}
      mainclassName="bg-yellow-100 text-yellow-800"
      bulletclassName="bg-yellow-500"
    />
  );
};
