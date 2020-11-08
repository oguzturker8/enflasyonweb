import React from "react";

export default function EditableInput({
  type,
  value,
  handleChange,
  id,
  label,
}) {
  return (
    <div>
      <p className="inputLabel">{label}</p>
      <input
        type={type}
        className="editableInput"
        value={value}
        onChange={(event) => handleChange(event, id, label)}
      />
    </div>
  );
}
