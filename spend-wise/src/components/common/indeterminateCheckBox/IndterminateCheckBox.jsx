import React, { useEffect } from "react";

function IndeterminateCheckbox({ indeterminate, ...rest }) {
  const ref = React.useRef(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <>
      <label className="checkbox-container">
        <input
          ref={ref}
          {...rest}
          //   onChange={(e) =>
          //     onChange({
          //       ...value,
          //       [option]: e.target.checked,
          //     })
          //   }
          //   checked={value[option]}
          //   id={`input-${option}`}
          type="checkbox"
        />
        <span className="checkmark"></span>
      </label>
    </>
  );

  //   <input type="checkbox" ref={ref} {...rest} />);
}

export default IndeterminateCheckbox;
