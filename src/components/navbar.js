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
          <li
            key={index}
            onClick={() => handleNav(index)}
            className={index === navIndex ? "navbarActive" : "navbarPassive"}
          >
            <box-icon
              name={item}
              type={item.includes("user") ? "solid" : null}
              color="#000"
            />
          </li>
        );
      })}
    </ul>
  );
}
