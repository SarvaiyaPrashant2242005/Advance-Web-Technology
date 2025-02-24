import React, { useContext } from "react";
import CompFour from "./CompFour";
import { nameContext } from "../App";

const CompThree = () => {
  const data = useContext(nameContext);

  return (
    <div>
      CompThree- Hi {data}
      <CompFour />
    </div>
  );
};

export default CompThree;
