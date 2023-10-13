import { useState, useEffect, useContext } from "react";
import "./App.css";
import Modal from "./components/Modal";
import PlayNumber from "./features/playNumber";
import StarDisplay from "./features/starDisplay";
import utils from "./features/utils";
import PlayAgain from "./features/playAgain";
import { DarkModeContext } from "./context/themeContext";
import { FaXTwitter } from "react-icons/fa";

function StarMatch(props) {
  const [showModal, setShowModal] = useState(true);

  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setavailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setcandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);
  //setTimeout code
  useEffect(() => {
    if (secondsLeft > 0 && !showModal && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const candidatessAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus =
    availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return "used";
    }

    if (candidateNums.includes(number)) {
      return candidatessAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return; //do nothing
    }
    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setcandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setavailableNums(newAvailableNums);
      setcandidateNums([]);
    }
  };

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <>
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
      <div className={`game ${showModal ? "modal-open" : ""}`}>
        <button className={`App`} onClick={toggleDarkMode}>
          Toggle theme
        </button>
        {/* I will give instructions to the game by a modal that will contain all the instructions for playing the game and provide a more detailed understanding of the game */}
        <div className="help">I will put instructions on how to play here</div>
        <div className="body">
          <div className="left">
            {gameStatus !== "active" ? (
              <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
            ) : (
              <StarDisplay count={stars} />
            )}
          </div>
          <div className="right">
            {utils.range(1, 9).map((number) => (
              <PlayNumber
                key={number}
                number={number}
                status={numberStatus(number)}
                onClick={onNumberClick}
              />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="timer">Time Remaining: {secondsLeft}</div>
          <button onClick={() => setShowModal(!showModal)}>
            Back to manual?
          </button>
        </div>
      </div>
      <footer>
        Made with {"\u2764"} by ~
        <a href="https://twitter.com/Fideltodayy" target="blank">
          Fideltodayy
        </a>
      </footer>
    </>
  );
}

const App = () => {
  const [gameId, setGameId] = useState(1);
  return (
    <StarMatch
      key={gameId}
      startNewGame={() => {
        setGameId(gameId + 1);
      }}
    />
  );
};
export default App;
