import React from "react";
import DetailsInflation from "./detailsInflation";

export default function Details({ data }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={detailsWrapper}>
        <p className="category">{data.category || data.email}</p>
        <div className="titleWrapper">
          <p className="title">{data.name || data.username}</p>
          {data.price ? <p className="price">${data.price}</p> : null}
        </div>
        <p className="pass">{data.password || null}</p>
        <img src={data.image || data.photo} className="image" alt="details" />
      </div>
      <div style={detailsInflationWrapepr}>
        {data.inflation
          ? data.inflation
              .sort((item1, item2) => {
                return item1.date > item2.date ? -1 : 1;
              })
              .map((item, index) => {
                return (
                  <DetailsInflation
                    price={item.price}
                    date={item.date}
                    current={data.price}
                    key={index}
                  />
                );
              })
          : null}
      </div>
    </div>
  );
}

const detailsWrapper = {
  borderBottom: "2px solid #dbdbdb",
  paddingBottom: 20,
};

const detailsInflationWrapepr = {
  paddingBottom: 100,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 40,
};
