import utils from "./utils";
import "../App.css";
function StarDisplay(props) {
  return (
    <>
      {utils.range(1, props.count).map((starId) => (
        <div key={starId} className="star" />
      ))}
    </>
  );
}

export default StarDisplay;
