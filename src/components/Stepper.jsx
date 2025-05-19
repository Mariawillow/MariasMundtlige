'use client';

import { useState } from 'react';

export default function Stepper() {
  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="flex items-center gap-4 text-2xl">
      {count > 1 && (
        <button
          onClick={decrement}
          className="px-3 py-1  border border-black hover:border-lime-400 transition"
        >
          −
        </button>
      )}
      <span>{count}</span>
      <button
        onClick={increment}
        className="px-3 py-1  border border-black hover:border-lime-400 transition"
        >
        +
      </button>
    </div>
  );
}
