import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./SelectDropDown.scss";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectValue {
  [key: string]: boolean;
}

interface SelectDropdownProps {
  onChange: (newValue: Option | MultiSelectValue) => void;
  placeholder?: string;
  value: Option | MultiSelectValue | null | undefined;
  options: Option[];
  label?: string;
  isMulti?: boolean;
  size?: "sm" | "md" | "lg" | "fw";
  isGrid?: boolean;
  setValue?: (newValue: Option) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  onChange,
  placeholder = "Select",
  value,
  options,
  label,
  isMulti = false,
  size,
  isGrid,
  setValue,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMulti && Array.isArray(options)) {
      const initialValue = options.reduce<MultiSelectValue>(
        (obj, option) => ({
          ...obj,
          [option.label]: false,
        }),
        {}
      );
      onChange(initialValue);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMulti, options, onChange]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const numberOfOptionsSelected =
    isMulti && value
      ? Object.values(value as MultiSelectValue).filter(Boolean).length
      : null;

  const displayValue = isMulti
    ? numberOfOptionsSelected && numberOfOptionsSelected > 0
      ? `${numberOfOptionsSelected} selected`
      : placeholder
    : (value as Option)?.label || placeholder;

  return (
    <div className="select-outerContainer">
      {label && <label htmlFor="category">{label}</label>}
      <div
        className={`select-container ${
          size === "sm" ? "select-sm" : size === "fw" ? "select-fw" : ""
        }`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          tabIndex={0}
          className="select-wrapper"
          role="button"
        >
          <div>{displayValue}</div>
          <MdKeyboardArrowDown className={open ? "rotate-logo" : ""} />
        </div>

        {open && (
          <div
            onClick={(e) => e.stopPropagation()}
            ref={dropdownRef}
            className={`options-container ${
              isGrid ? "options-container-grid" : ""
            }`}
          >
            {options.length > 0 ? (
              options.map((option, id) => (
                <div
                  key={id}
                  className={`option-wrapper ${
                    !isMulti &&
                    value &&
                    option.value === (value as Option).value
                      ? "option-background"
                      : ""
                  }`}
                  onClick={() => {
                    if (!isMulti) {
                      onChange(option);
                      setValue?.(option);
                      setOpen(false);
                    }
                  }}
                >
                  {isMulti && (
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        id={`input-${option.label}`}
                        checked={
                          (value &&
                            (value as MultiSelectValue)[option.label]) ||
                          false
                        }
                        onChange={(e) =>
                          onChange({
                            ...(value as MultiSelectValue),
                            [option.label]: e.target.checked,
                          })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  )}
                  <div
                    className={
                      !isMulti &&
                      value &&
                      option.value === (value as Option).value
                        ? "option"
                        : ""
                    }
                  >
                    {option.label}
                  </div>
                </div>
              ))
            ) : (
              <div>--Please add items--</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDropdown;
