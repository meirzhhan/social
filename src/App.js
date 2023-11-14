import React, { useState } from "react";

function App() {
  const [likes, setLikes] = useState(0);
  const [value, setValue] = useState('txt in input')
  // console.log(likes);
  // console.log(setLikes);

  function increment() {
    setLikes(likes + 1)
  }
  function decrement() {
    setLikes(likes - 1)
  }
  return (
    <div className="App">
      <h1>{likes}</h1>
      <h2>{value}</h2>
      <input 
        type="text" 
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
