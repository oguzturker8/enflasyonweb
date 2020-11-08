import React from "react";

export default function Navbar({
  setIndex,
  navIndex,
  setHideRight,
  handleLogout,
}) {
  const bars = [
    "list-ul",
    "user-detail",
    "list-check",
    "user-check",
    "log-out",
  ];

  const handleNav = (index) => {
    if (index === 4) {
      handleLogout();
    } else {
      setIndex(index);
      setHideRight(0);
    }
  };

  return (
    <ul className="navbar">
      {bars.map((item, index) => {
        return (
          <li key={index} onClick={() => handleNav(index)}>
            <box-icon
              name={item}
              type={item.includes("user") ? "solid" : null}
              color="#000"
              style={
                index === navIndex ? borderRightActive : borderRightPassive
              }
            />
          </li>
        );
      })}
    </ul>
  );
}

const borderRightActive = {
  width: 80,
  height: 30,
  borderRight: "4px solid #ffbe0b",
};

const borderRightPassive = {
  width: 80,
  height: 30,
  borderRight: "4px solid transparent",
};
