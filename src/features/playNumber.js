import colors from "./colors";
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

export default PlayNumber;
