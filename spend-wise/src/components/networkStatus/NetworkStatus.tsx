import React, { useState, useEffect } from "react";
import { CATEGORY_COLOR_OPTIONS } from "../../constants/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const NetworkStatus: React.FC = () => {
  const { isOnline } = useSelector((state: RootState) => state.network);

  return (
    !isOnline && (
      <div
        style={{
          background: CATEGORY_COLOR_OPTIONS[2],
          color: "white",
          padding: "10px",
          textAlign: "center",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        Houston, we have a problem! Internet signal is missing.
      </div>
    )
  );
};

export default NetworkStatus;
