import React from "react";

export default function ListItem({ item, type, setHideRight, setRightData }) {
  function openDetails() {
    setRightData(item);
    setHideRight(1);
  }

  return (
    <div className="listItem" onClick={openDetails}>
      {type === "product" ? (
        <div>
          <img
            className="listItemBG"
            width="220"
            alt="itempic"
            height="160"
            src={item.image}
          />
          <div className="listTextWrapper">
            <span className="dummy">{item.name}</span>
            <span className="dummy">${item.price}</span>
          </div>
          <span className="details">{item.category}</span>
        </div>
      ) : (
        <div>
          <img
            className="listItemBG"
            width="220"
            alt="itempic"
            height="160"
            src={item.image}
          />
          <div className="userTextWrapper">
            <p className="dummy">{item.username}</p>
            <p className="dummy">{item.email}</p>
            <p className="pass">{item.password}</p>
          </div>
        </div>
      )}
    </div>
  );
}
