import colors from "./colors";
function PlayNumber(props) {
  return (
    <button
      key={props.number}
      style={{ backgroundColor: colors[props.status] }}
      onClick={() => {
        props.onClick(props.number, props.status);
      }}
      className="number dark:text-black"
    >
      {props.number}
    </button>
  );
}

export default PlayNumber;
