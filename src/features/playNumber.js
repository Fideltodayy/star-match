export default function PlayNumber(props) {
  return (
    <button key={props.number} class="number">
      {props.number}
    </button>
  );
}
