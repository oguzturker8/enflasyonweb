import React from "react";
import EditableInput from "./editableinput";

export default function EditableProduct({
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
        value={item.name}
        handleChange={handleChange}
        id={id}
        label={"name"}
      />
      <EditableInput
        type="number"
        value={item.price}
        handleChange={handleChange}
        id={id}
        label={"price"}
      />
      <EditableInput
        type="text"
        value={item.category}
        handleChange={handleChange}
        id={id}
        label={"category"}
      />
      <EditableInput
        type="text"
        value={item.image}
        handleChange={handleChange}
        id={id}
        label={"image"}
      />
      <div className="updateIcon" onClick={() => handleRemove(id)}>
        <box-icon name="x-circle" color="#fff" size="32px" />
      </div>
    </div>
  );
}
