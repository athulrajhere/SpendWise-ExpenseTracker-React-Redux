import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOnline, setOffline } from "../features/networkStatus/networkSlice";

const NetworkStatusListener: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateOnlineStatus = () => {
      if (navigator.onLine) {
        dispatch(setOnline());
      } else {
        dispatch(setOffline());
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [dispatch]);

  return null;
};

export default NetworkStatusListener;
