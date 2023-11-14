import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";

function App() {
  const [value, setValue] = useState('txt in input')

  return (
    <div className="App">
      <Counter/>
      <ClassCounter/>
    </div>
  );
}

export default App;
