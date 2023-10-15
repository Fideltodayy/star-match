import { useState, useEffect, useContext } from "react";
import "./App.css";
import Modal from "./components/Modal";
import PlayNumber from "./features/playNumber";
import StarDisplay from "./features/starDisplay";
import utils from "./features/utils";
import PlayAgain from "./features/playAgain";
import { DarkModeContext } from "./context/themeContext";
import { BsSun } from "react-icons/bs";
import { BsMoonStarsFill } from "react-icons/bs";
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
      <div className={`game h-screen ${showModal ? "modal-open" : ""}`}>
        <div className="flex justify-between items-center h-16 mx-4 px-4 bg-slate-200 dark:bg-gray-800  rounded-full border-2 border-gray-600">
          <div>
            <h2 className=" text-3xl" style={{ fontFamily: "Dancing Script" }}>
              Star-Match
            </h2>
          </div>
          <div>
            {darkMode ? (
              <BsMoonStarsFill onClick={toggleDarkMode} className="" />
            ) : (
              <BsSun onClick={toggleDarkMode} className="" />
            )}
          </div>
        </div>

        <div className=" centerbody">
          {/* I will give instructions to the game by a modal that will contain all the instructions for playing the game and provide a more detailed understanding of the game */}
          <div
            className="marquee-content text-lg"
            style={{ fontFamily: "Kalam" }}
          >
            <span>
              For each random number of stars, pick 1 or more numbers that sum
              up to the given number of stars. If you pick more numbers than the
              count of stars, they will be marked as wrong in red. You can
              always unpick the candidates or wrong numbers to make the correct
              selection. Keep an eye on the timer! If it runs out and you
              haven't picked all the numbers, the game is over. Click "PLAY
              AGAIN" to start a new game at any time.
            </span>
          </div>
          <div className="body rounded-xl  shadow-2xl shadow-slate-200 dark:shadow-slate-700">
            <div className="left ">
              {gameStatus !== "active" ? (
                <PlayAgain
                  onClick={props.startNewGame}
                  gameStatus={gameStatus}
                />
              ) : (
                <StarDisplay count={stars} />
              )}
            </div>
            <div className="right ">
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
      </div>
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
