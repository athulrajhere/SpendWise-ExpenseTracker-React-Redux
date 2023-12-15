import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./SelectDropdown.scss";

const SelectDropdown = ({
  onChange,
  placeholder,
  value,
  options,
  label,
  isMulti,
  size,
}) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // if (isMulti) {
  useEffect(() => {
    console.log(options);
    if (isMulti) {
      onChange(
        options.reduce(
          (obj, option) => ({
            ...obj,
            [option]: false,
          }),
          {}
        )
      );
    }

    const onClick = (e) => {
      if (e.target !== dropdownRef.current) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };

    // return () => {
    //   second;
    // };
  }, []);

  // }

  const handleClick = () => {
    console.log("Clicked");
  };

  const numberOfOptionsSelected = isMulti
    ? Object.values(value).filter(Boolean).length
    : null;

  return (
    <div className="select-outerContainer">
      <label htmlFor="category">{label}</label>
      <div
        className={`select-container ${
          size === "sm" ? `select-sm` : size === "fw" ? `select-fw` : ""
        }`}
        // onBlur={(e) => {
        //   if (!e.currentTarget.contains(e.relatedTarget)) {
        //     setOpen((prevState) => !prevState);
        //   }
        // }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prevState) => !prevState);
          }}
          tabIndex={0}
          className="select-wrapper"
        >
          <p>
            {isMulti
              ? numberOfOptionsSelected > 0
                ? `${numberOfOptionsSelected} selected`
                : "Select"
              : value
              ? value
              : placeholder}
          </p>
          <MdKeyboardArrowDown className={`${open ? "rotate-logo" : ""}`} />
        </div>

        {open && (
          <div
            onClick={(e) => e.stopPropagation()}
            ref={dropdownRef}
            className="options-container"
          >
            {options.map((option, id) => {
              return (
                <div
                  htmlFor={isMulti ? `input-${option}` : ""}
                  onClick={() => {
                    if (!isMulti) {
                      onChange(option);
                      setOpen(false);
                    }
                  }}
                  key={id}
                  className={`option-wrapper ${
                    option === value ? "option-background" : ""
                  }`}
                >
                  {isMulti ? (
                    <label className="checkbox-container">
                      <input
                        onChange={(e) =>
                          onChange({
                            ...value,
                            [option]: e.target.checked,
                          })
                        }
                        checked={value[option]}
                        id={`input-${option}`}
                        type="checkbox"
                      />
                      <span className="checkmark"></span>
                    </label>
                  ) : (
                    ""
                  )}
                  <label
                    htmlFor={isMulti ? `input-${option}` : ""}
                    key={id}
                    onClick={!isMulti ? handleClick : null}
                    className={`${option === value ? "option" : ""}`}
                  >
                    {option}
                  </label>
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
