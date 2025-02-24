import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [myVal, setMyVal] = useState(0);
  // to handle counter click
  const handleCounterClick = (e) => {
    setCounter(counter + 1);
  };
  useEffect(() => {
    //first
    console.log("from first ", counter);
    if (counter % 2 == 0) setMyVal(counter * 2);

    return () => {
      console.log("from second ", counter);
      //second
    };
  }, [counter, myVal]);

  return (
    <div>
      <button onClick={handleCounterClick}>Count:{counter}</button>
      <p>{myVal}</p>
    </div>
  );
}

export default App;
