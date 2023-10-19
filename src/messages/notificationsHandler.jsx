import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notificationType } from "../constants/constants";

export const notify = (message, notType = notificationType.error) => {
    switch (notType) {
      case notificationType.error:
        toast.error(message);
        break;
      case notificationType.info:
        toast.info(message);
        break;
      case notificationType.success:
        toast.success(message);
        break;
      case notificationType.warning:
        toast.warning(message);
        break;
    }
  };

export const ToastNotification = () => {
  useEffect(() => {
    console.log("Toast Notification");
  }, [])
  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} style={{zIndex:2000}}/>
    </>
  );
};

