import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./SelectDropdown.scss";

const SelectDropdown = ({ onChange, placeholder, value, options, label }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <div>
      <label htmlFor="category">{label}</label>
      <div className="select-container">
        <div
          onClick={() => setOpen(!open)}
          tabIndex={0}
          className="select-wrapper"
        >
          <p>{value ? value : placeholder}</p>
          <MdKeyboardArrowDown className={`${open ? "rotate-logo" : ""}`} />
        </div>

        {open && (
          <div className="options-container">
            {options.map((option, id) => {
              return (
                <div
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  key={id}
                  className={`option-wrapper ${
                    option === value ? "option-background" : ""
                  }`}
                >
                  <p
                    key={id}
                    onClick={handleClick}
                    className={`${option === value ? "option" : ""}`}
                  >
                    {option}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDropdown;
