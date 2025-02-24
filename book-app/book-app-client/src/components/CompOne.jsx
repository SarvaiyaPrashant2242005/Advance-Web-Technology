import React, { useContext } from "react";
import CompTwo from "./CompTwo";
import { nameContext } from "../App";

const CompOne = () => {
  const data = useContext(nameContext);

  return (
    <div>
      CompOne - Welcome {data}
      <CompTwo />
    </div>
  );
};

export default CompOne;
