import { useState, useEffect } from "react";
import "./App.css";
// import PlayNumber from "./features/playNumber";
// import StarDisplay from "./features/StarDisplay";
// import utils from "./features/utils";

//

import React from "react";

function Modal({ showModal, setShowModal }) {
  return (
    <div className={`modal${showModal ? " show" : ""}`}>
      <div className="modal-content">
        <h1>Instructions</h1>
        <p>
          Welcome to <span className="highlight">Star Match!</span> This is a
          simple math skills game where your goal is to use all 9 numbers to
          match the random number of stars given.
        </p>
        <p>
          Here's how to play:
          <ol>
            <li>
              For each random number of stars, pick 1 or more numbers that sum
              up to the given number of stars.
            </li>
            <li>
              If you pick more numbers than the count of stars, they will be
              marked as wrong in red.
            </li>
            <li>
              You can always unpick the candidates or wrong numbers to make the
              correct selection.
            </li>
            <li>
              Keep an eye on the timer! If it runs out and you haven't picked
              all the numbers, the game is over.
            </li>
            <li>Click "PLAY AGAIN" to start a new game at any time.</li>
          </ol>
        </p>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
}

function PlayNumber(props) {
  return (
    <button
      key={props.number}
      style={{ backgroundColor: colors[props.status] }}
      onClick={() => {
        props.onClick(props.number, props.status);
      }}
      className="number"
    >
      {props.number}
    </button>
  );
}

function StarDisplay(props) {
  return (
    <>
      {utils.range(1, props.count).map((starId) => (
        <div key={starId} className="star" />
      ))}
    </>
  );
}

//

function PlayAgain(props) {
  return (
    <div className="restart">
      <div
        className="message"
        style={{ color: props.gameStatus === "lost" ? "red" : "green" }}
      >
        {props.gameStatus === "lost" ? "Game Over" : "Nice"}
      </div>
      <button onClick={props.onClick}>Play Again</button>
    </div>
  );
}

function App() {
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
  const resetGame = () => {
    setStars(utils.random(1, 9));
    setavailableNums(utils.range(1, 9));
    setcandidateNums([]);
  };

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
    if (gameStatus !== "active" || currentStatus == "used") {
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

  return (
    <>
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
      <div className="game">
        {/* I will give instructions to the game by a modal that will contain all the instructions for playing the game and provide a more detailed understanding of the game */}
        <div className="help">I will put instructions on how to play here</div>
        <div className="body">
          <div className="left">
            {gameStatus !== "active" ? (
              <PlayAgain onClick={resetGame} gameStatus={gameStatus} />
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

const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

// Math science
const utils = {
  // Sum an array
  sum: (arr) => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default App;
