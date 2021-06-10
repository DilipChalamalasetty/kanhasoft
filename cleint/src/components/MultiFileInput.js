import React, { useState } from "react";

export const MultiFileInput = (props) => {
  const setInternalFiles = (internalFile) => {
    console.log(internalFile);
    props.setData({ ...props.data, file: internalFile[0] });
  };

  return (
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={(event) => {
        setInternalFiles(event.target.files);
        //event.target.value = null;
      }}
    />
  );
};
