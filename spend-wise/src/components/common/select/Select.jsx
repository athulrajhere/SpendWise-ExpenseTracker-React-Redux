import React, { useEffect, useRef, useState } from "react";
import "./select.scss";
import { RiArrowDownFill, RiArrowDropDownFill } from "react-icons/ri";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Select = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.reduce(
      (obj, option) => ({
        ...obj,
        [option]: false,
      }),
      {}
    )
  );

  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (e.target !== dropdownRef.current) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  const numberOfOptionsSelected =
    Object.values(selected).filter(Boolean).length;
  console.log(numberOfOptionsSelected);
  return (
    <fieldset className="state-dropdown">
      <button
        // className="state-dropdown"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prevState) => !prevState);
        }}
      >
        {numberOfOptionsSelected > 0
          ? `${numberOfOptionsSelected} selected`
          : "Select"}

        {!isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </button>
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={dropdownRef}
          className="panel"
        >
          {options.map((option, ind) => {
            return (
              <fieldset
                key={ind}
                className={selected[option] ? `selected` : ""}
              >
                <input
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      [option]: e.target.checked,
                    })
                  }
                  checked={selected[option]}
                  id={`input-${option}`}
                  type="checkbox"
                />
                <label htmlFor={`input-${option}`}>{option}</label>
              </fieldset>
            );
          })}
        </div>
      )}
    </fieldset>
  );
};

export default Select;
