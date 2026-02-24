import { useState } from "react";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p className="text-4xl font-bold text-green-700">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
