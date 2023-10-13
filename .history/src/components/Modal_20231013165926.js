function Modal({ showModal, setShowModal }) {
  return (
    <div
      className={`modal${
        showModal ? " show" : ""
      }bg-slate-100 dark:bg-slate-900 text-black dark:text-white`}
    >
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

export default Modal;
