function PlayAgain(props) {
  return (
    <div className="restart">
      <div
        className=" font-bold m-3 text-2xl"
        style={{ color: props.gameStatus === "lost" ? "red" : "green" }}
      >
        {props.gameStatus === "lost" ? "Game Over" : "Nice"}
      </div>
      <button
        style={{ fontFamily: "Kalam" }}
        className=" text-lg  border-2 rounded-full px-2 dark:bg-slate-300 bg-slate-800 dark:text-black text-white"
        onClick={props.onClick}
      >
        Play Again
      </button>
    </div>
  );
}

export default PlayAgain;
