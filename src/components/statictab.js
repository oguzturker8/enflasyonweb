import React from "react";

export default function StaticTab({ name, type }) {
  return (
    <ul>
      <li className="active">
        <box-icon type={type} name={name} size="16px" color="#242015" />
        All
      </li>
    </ul>
  );
}
