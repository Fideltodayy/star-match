import utils from "./utils";
export default function StarDisplay(props) {
  return (
    <>
      {utils.range(1, props.stars).map((starId) => (
        <div key={starId} class="star" />
      ))}
    </>
  );
}
