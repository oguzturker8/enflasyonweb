import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import EditableUser from "./editableuser";
import { storage } from "../helpers/firebase";

export default function EditUser({ rawData, setRawData }) {
  const [item, setItem] = useState({
    email: "",
    password: "",
    username: "",
    image: "",
  });

  const [imageAsFile, setImageAsFile] = useState("");

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const addUser = (e) => {
    e.preventDefault();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      !re.test(String(item.email).toLowerCase()) ||
      item.password.length < 6 ||
      !item.username.length ||
      !imageAsFile
    ) {
      setError("Wrong user addition");
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
        <h1 className="title">Add User</h1>

        <div className="addContainer">
          <span
            style={{
              fontSize: 18,
              color: "red",
              fontWeight: "700",
            }}
          >
            {error}
          </span>
          <input
            placeholder="Username"
            style={{ width: "60%" }}
            type="text"
            value={item.username}
            onChange={(event) =>
              setItem((prev) => ({ ...prev, username: event.target.value }))
            }
          />
          <input
            placeholder="E-Mail"
            style={{ width: "60%" }}
            type="text"
            value={item.mail}
            onChange={(event) =>
              setItem((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <input
            placeholder="Passoword"
            style={{ width: "60%" }}
            type="password"
            value={item.password}
            onChange={(event) =>
              setItem((prev) => ({ ...prev, password: event.target.value }))
            }
          />
          <div className="addImage" style={{ padding: 40 }}>
            <label for="upload-photo">
              <box-icon name="image-add" color="#ffca44" size="48px" />
            </label>
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
          <a className="addText" onClick={addUser}>
            Add User
          </a>
        </div>
      </div>

      <div className="updateProduct">
        <h1>Update User</h1>
        <a
          className="addText"
          style={{ marginBottom: 10 }}
          onClick={() => {
            console.log("RAW DATA GOING TO WRITE ON FIRESTORE");
          }}
        >
          Update the Changes
        </a>
        {rawData.map((item, index) => {
          if (!item) return;
          return (
            <EditableUser
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
