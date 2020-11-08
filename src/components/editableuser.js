import React from "react";
import EditableInput from "./editableinput";

export default function EditableUser({
  id,
  item,
  bg,
  handleChange,
  handleRemove,
}) {
  return (
    <div className="editable" style={{ backgroundColor: bg }}>
      <EditableInput
        type="text"
        value={item.username}
        handleChange={handleChange}
        id={id}
        label={"username"}
      />
      <EditableInput
        type="text"
        value={item.email}
        handleChange={handleChange}
        id={id}
        label={"email"}
      />
      <EditableInput
        type="text"
        value={item.password}
        handleChange={handleChange}
        id={id}
        label={"password"}
      />
      <EditableInput
        type="text"
        value={item.image}
        handleChange={handleChange}
        id={id}
        label={"photo"}
      />
      <div className="updateIcon" onClick={() => handleRemove(id)}>
        <box-icon name="x-circle" color="#fff" size="32px" />
      </div>
    </div>
  );
}
