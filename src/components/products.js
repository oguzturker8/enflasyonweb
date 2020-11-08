import React from "react";
import ListItem from "./listitem";
import SearchTabs from "./searchtabs";

export default function Products({
  tabIndex,
  setTabIndex,
  setFiltered,
  rawData,
  filtered,
  setHideRight,
  setRightData,
  productFilter,
}) {
  return (
    <div>
      <SearchTabs
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        setFiltered={setFiltered}
        rawData={rawData}
        productFilter={productFilter}
      />
      <div className="listWrapper">
        {filtered.map((item, index) => {
          return (
            <ListItem
              key={index}
              item={item}
              type="product"
              setHideRight={setHideRight}
              setRightData={setRightData}
            />
          );
        })}
      </div>
    </div>
  );
}
