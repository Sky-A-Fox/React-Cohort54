import { useState } from "react";
import Count from "./Count";
import Button from "./Button";

function Counter() {
  const [count, setCount] = useState<number>(0);

const feedback =
  count > 15
    ? "Do you have personal life? Stop clicking!"
    : count > 10
    ? "It's higher than 10!"
    : "Keep counting...";

  return (
    <div className="container">
      <Count count={count} />
      <Button onAdd={() => setCount(count + 1)} />
      <p>{feedback}</p>
    </div>
  );
}

export default Counter;
