'use client';

import { ToastContainer } from "react-toast";

const ToastProvider = () => {
  return (
    <div className="bg-red-500 z-50">
        <ToastContainer position="top-right" />
    </div>
  )
}

export default ToastProvider