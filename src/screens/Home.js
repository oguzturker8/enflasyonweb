import React, { useEffect, useState } from "react";

import "boxicons";
import Details from "../components/details";
import Navbar from "../components/navbar";
import Search from "../components/search";
import Slider from "../components/slider";
import Products from "../components/products";
import Users from "../components/users";
import EditUser from "../components/edituser";
import EditProduct from "../components/editproduct";

//DBs
import product from "../data/product.json";
import user from "../data/user.json";
import Banner from "../components/banner";

export default function Home({ handleLogout }) {
  const [index, setIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [hideRight, setHideRight] = useState(0);
  const [rightData, setRightData] = useState(["", "", "", "", []]);
  const [rawProducts, setRawProducts] = useState(product);
  const [filtered, setFiltered] = useState(rawProducts);
  const [rawUsers, setRawUsers] = useState(user);
  const [search, setSearch] = useState("");

  const productFilter = ["All", "Car", "Food", "Tech", "Goods"];

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (index === 0) {
      setFiltered(
        rawProducts.filter((item) =>
          item.name
            .toLocaleLowerCase()
            .includes(event.target.value.toLocaleLowerCase())
        )
      );
    } else {
      setFiltered(
        rawUsers.filter((item) =>
          item.username
            .toLocaleLowerCase()
            .includes(event.target.value.toLocaleLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    if (index === 0) {
      setFiltered(rawProducts);
    } else if (index === 1) {
      setFiltered(rawUsers);
    } else {
      setFiltered([]);
    }
  }, [index]);

  return (
    <div className="home">
      <Banner />
      <div className="container">
        <Navbar
          setIndex={setIndex}
          navIndex={index}
          setHideRight={setHideRight}
          setFiltered={setFiltered}
          filtered={filtered}
          handleLogout={handleLogout}
        />
        <div
          className="middle"
          onClick={(event) => {
            if (
              String(event.target.className) === "middle" ||
              String(event.target.className) === ""
            ) {
              setHideRight(0);
            }
          }}
          style={hideRight !== 0 ? { width: "70vw" } : null}
        >
          {index === 0 || index === 1 ? (
            <Search handleSearch={handleSearch} search={search} />
          ) : null}
          {index === 0 || index === 1 ? <Slider /> : null}
          {index === 0 ? (
            <Products
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              setFiltered={setFiltered}
              rawData={rawProducts}
              filtered={filtered}
              setRightData={setRightData}
              setHideRight={setHideRight}
              productFilter={productFilter}
            />
          ) : index === 1 ? (
            <Users
              setFiltered={setFiltered}
              rawData={rawUsers}
              filtered={filtered}
              setRightData={setRightData}
              setHideRight={setHideRight}
            />
          ) : index === 2 ? (
            <EditProduct
              productFilter={productFilter}
              rawData={rawProducts}
              setRawData={setRawProducts}
            />
          ) : index === 3 ? (
            <EditUser rawData={rawUsers} setRawData={setRawUsers} />
          ) : null}
        </div>
        {index === 0 || index === 1 ? (
          <div
            className={["right", hideRight !== 0 ? " active" : null].join(" ")}
          >
            <Details data={rightData} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
