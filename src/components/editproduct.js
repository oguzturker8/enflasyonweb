import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { storage } from "../helpers/firebase";
import EditableProduct from "./editableproduct";

export default function EditProduct({ productFilter, rawData, setRawData }) {
  const [item, setItem] = useState({
    name: "",
    price: "",
    image: "",
    category: "Undecided",
    inflation: [],
  });

  const [imageAsFile, setImageAsFile] = useState("");

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (!item.name || !item.price || !item.category || !imageAsFile) {
      setError("Wrong product addition");
    } else {
      setError("");
      const uploadTask = storage
        .ref(`/images/${imageAsFile.name}`)
        .put(imageAsFile);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          console.log(snapShot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("images")
            .child(imageAsFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setItem((prev) => ({ ...prev, image: fireBaseUrl }));
            });
        }
      );
    }
  };

  useEffect(() => {
    if (item.image) {
      setRawData([...rawData, item]);
    }
  }, [item.image]);

  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const handleCategory = (item) => {
    setItem((prev) => ({ ...prev, category: item }));
  };

  const infHandlePrice = (event, index) => {
    let tmp = [...item.inflation];
    tmp[index] = { ...tmp[index], price: event.target.value };
    setItem((prev) => ({ ...prev, inflation: tmp }));
  };

  const infHandleDate = (date, index) => {
    let tmp = [...item.inflation];
    tmp[index] = { ...tmp[index], date };
    setItem((prev) => ({ ...prev, inflation: tmp }));
  };

  const infHandleRemove = (indx) => {
    let tmp = [...item.inflation];
    delete tmp[indx];
    tmp = tmp.filter((el) => !!el); //undefined empty -> false object-> true
    setItem((prev) => ({ ...prev, inflation: tmp }));
  };

  const handleUpdate = (id, data) => {
    let tmp = [...rawData];
    tmp[id] = data;
    setRawData(tmp);
  };

  const handleRemove = (id) => {
    let tmp = [...rawData];
    delete tmp[id];
    tmp = tmp.filter((el) => !!el); //undefined empty -> false object-> true
    setRawData(tmp);
  };

  const handleChange = (event, id, type) => {
    let tmp = [...rawData];
    tmp[id][type] = event.target.value;
    setRawData(tmp);
  };

  return (
    <div className="editProduct">
      <div className="addProduct">
        <h1 className="title">Add Product</h1>
        <div className="addContainer">
          <span
            style={{
              fontSize: 18,
              color: "red",
              fontWeight: "700",
              marginTop: 40,
            }}
          >
            {error}
          </span>
          <input
            placeholder="Product Name"
            value={item.name}
            onChange={(event) =>
              setItem((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <input
            placeholder="Price"
            type="number"
            value={item.price}
            onChange={(event) =>
              setItem((prev) => ({ ...prev, price: event.target.value }))
            }
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <div class="dropdown">
              <button class="dropButton">Category</button>
              <span className="category">{item.category}</span>
              <div class="dropdownContainer">
                {productFilter
                  .filter((item) => item !== "All")
                  .map((item, index) => (
                    <a key={index} onClick={() => handleCategory(item)}>
                      {item}
                    </a>
                  ))}
              </div>
            </div>
            <div className="addImage" style={{ paddingLeft: 40 }}>
              <label for="upload-photo">
                <box-icon name="image-add" color="#ffca44" size="48px" />
              </label>
            </div>
          </div>
          <input
            type="file"
            name="photo"
            id="upload-photo"
            style={{
              opacity: 0,
              position: "absolute",
              zIndex: -1,
            }}
            onChange={handleImageAsFile}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              className="addImage"
              onClick={() => {
                let tmp = [...item.inflation];
                tmp.push({ id: item.inflation.length });
                setItem((prev) => ({ ...prev, inflation: tmp }));
              }}
            >
              <box-icon
                name="plus-circle"
                type="solid"
                color="#ffca44"
                size="48px"
              />
            </div>
            <span className="inflationText">Inflation</span>
          </div>

          {item.inflation.map((_, index) => {
            if (!_) return;
            return (
              <div className="inflationContainer">
                <input
                  placeholder="Price"
                  type="number"
                  value={_?.price || ""}
                  onChange={(event) => infHandlePrice(event, index)}
                />
                <DatePicker
                  selected={_?.date || startDate}
                  dateFormat="Pp"
                  placeholderText="Select a date"
                  onChange={(date) => infHandleDate(date, index)}
                />
                <div onClick={() => infHandleRemove(index)}>
                  <box-icon
                    name="x-circle"
                    type="solid"
                    color="#ffca44"
                    size="48px"
                  />
                </div>
              </div>
            );
          })}

          <button
            className="addText"
            style={{ border: "none" }}
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="updateProduct">
        <h1 className="title">Update Product</h1>
        <a
          className="updateList"
          onClick={() => {
            console.log("RAW DATA GOING TO WRITE ON FIRESTORE");
          }}
        >
          Update the Changes
        </a>
        {rawData.map((item, index) => {
          if (!item) return;
          return (
            <EditableProduct
              key={index}
              id={index}
              item={item}
              setRawData={setRawData}
              handleUpdate={handleUpdate}
              handleRemove={handleRemove}
              handleChange={handleChange}
              bg={index % 2 === 0 ? "#f6f6f6" : "#e5e5e5"}
            />
          );
        })}
      </div>
    </div>
  );
}
