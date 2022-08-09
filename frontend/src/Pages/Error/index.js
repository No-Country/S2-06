import "./Error.css";

const Error = () => {
  return (
    <>
      <div className="content-error">
        <h1 className="title-error">¡Sorry, páge not found!</h1>
        <p className="title-error">Sorry but the page you requested was not found.</p>
        <p className="title-error">
          If you typed the URL directly, please make sure it is correct.
        </p>
        <p className="title-error">
          If you followed a link to get here, it may be outdated.
        </p>
        <p className="title-error">
          You can find the game you are looking for by navigating the main menu.
        </p>
      </div>
    </>
  );
};

export default Error;
