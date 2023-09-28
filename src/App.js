import { useState } from "react";
import "./App.css";

function PlayNumber(props) {
  <button key={number} className="number">
    {number}
  </button>;
}

function App() {
  const [stars, setStars] = useState(utils.random(1, 9));
  return (
    <>
      <div className="game">
        {/* I will give instructions to the game by a modal that will contain all the instructions for playing the game and provide a more detailed understanding of the game */}
        <div className="help">I will put instructions on how to play here</div>
        <div className="body">
          <div className="left">
            {utils.range(1, stars).map((starId) => (
              <div key={starId} className="star" />
            ))}
          </div>
          <div className="right">
            {utils.range(1, 9).map((number) => (
              <PlayNumber />
            ))}
          </div>
        </div>
        <div className="timer">Time Remaining: 10</div>
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
