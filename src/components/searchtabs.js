import React from "react";

export default function SearchTabs({
  tabIndex,
  setTabIndex,
  setFiltered,
  rawData,
  productFilter,
}) {
  const filterBoxIcon = [
    {
      name: "grid-alt",
      type: "solid",
    },
    {
      name: "car",
      type: "solid",
    },
    {
      name: "food-menu",
    },
    {
      name: "tv",
      type: "solid",
    },
    {
      name: "book-alt",
      type: "solid",
    },
  ];

  const handleTabClick = (index) => {
    setTabIndex(index);
    if (index !== 0) {
      setFiltered(
        rawData.filter((item) => item.category === productFilter[index])
      );
    } else {
      setFiltered(rawData);
    }
  };

  return (
    <div>
      <ul>
        {productFilter.map((item, index) => {
          return (
            <li
              className={tabIndex === index ? "active" : "passive"}
              onClick={() => {
                handleTabClick(index);
              }}
            >
              <box-icon
                name={filterBoxIcon[index].name}
                type={filterBoxIcon[index].type}
                size="16px"
                color="#242015"
              />
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
