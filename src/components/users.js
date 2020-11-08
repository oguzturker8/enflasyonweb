import React from "react";
import ListItem from "./listitem";
import StaticTab from "./statictab";

export default function Users({ filtered, setHideRight, setRightData }) {
  return (
    <div>
      <StaticTab name="grid-alt" type="solid" />
      <div className="listWrapper">
        {filtered.map((item, index) => {
          return (
            <ListItem
              key={index}
              item={item}
              type="user"
              setHideRight={setHideRight}
              setRightData={setRightData}
            />
          );
        })}
      </div>
    </div>
  );
}
