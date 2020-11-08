import moment from "moment";
import React from "react";
import ReactTooltip from "react-tooltip";

export default function DetailsInflation({ price, current, date }) {
  const calcRate = () => {
    if (current < price) {
      return (price / current).toFixed(2) + " +";
    } else if (current > price) {
      return (current / price).toFixed(2) + " -";
    } else {
      return 1;
    }
  };

  return (
    <div className="inflation" style={centered}>
      <ReactTooltip />
      <p className="date">
        {moment
          .unix(date)
          .format("MM/DD/YYYY")
          .replace("/", "-")
          .replace("/", "-")}
      </p>
      <div className="inflationInner">
        <p
          className="price"
          data-tip={"x" + String(calcRate())}
          style={
            price < current
              ? { color: "green" }
              : price > current
              ? { color: "red" }
              : { color: "black" }
          }
        >
          ${price}
        </p>
      </div>
    </div>
  );
}

const centered = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};
