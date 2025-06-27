import React from "react";
import "./customRadio.scss";
import { CustomRadioProps } from "./types";

const CustomRadio: React.FC<CustomRadioProps> = ({
  item,
  checked,
  onChange,
}) => {
  return (
    <>
      <input
        id={`radio-${item.label}`}
        className="radio-input"
        type="radio"
        value={item.id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`radio-${item.label}`} className="radio-label">
        {item.label}
      </label>
    </>
  );
};

export default React.memo(CustomRadio);
