import React from "react";

export const Alert = ({ message }: { message: string }) => {
  return (
    <>
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex gap-2 items-center"
        role="alert"
      >
        <span className="material-icons-outlined">error</span>
        <span>{message}</span>
      </div>
    </>
  );
};
