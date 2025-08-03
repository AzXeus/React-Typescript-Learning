import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

// Custom hook example - this is "hoisting" logic into reusable functions
const useCounter = (initialValue: number = 0, step: number = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((prev) => prev + step), [step]);
  const decrement = useCallback(() => setCount((prev) => prev - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
};

// Custom hook for local storage
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return [storedValue, setValue] as const;
};

// Timer custom hook
const useTimer = (initialSeconds: number = 0) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, seconds]);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);
  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setIsActive(false);
  }, [initialSeconds]);

  return { seconds, isActive, start, pause, reset };
};

const HooksExample: React.FC = () => {
  // Using our custom hooks
  const counter = useCounter(0, 2);
  const [name, setName] = useLocalStorage("user-name", "");
  const timer = useTimer(10);

  // useRef for DOM manipulation
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusCount, setFocusCount] = useState(0);

  // useEffect examples
  useEffect(() => {
    console.log("Component mounted");
    return () => console.log("Component will unmount");
  }, []); // Empty dependency array = runs once on mount

  useEffect(() => {
    console.log("Counter changed:", counter.count);
  }, [counter.count]); // Runs when counter.count changes

  useEffect(() => {
    document.title = `Counter: ${counter.count}`;
    return () => {
      document.title = "React + TypeScript Learning";
    };
  }, [counter.count]);

  // useCallback - memoizes functions to prevent unnecessary re-renders
  const handleFocusInput = useCallback(() => {
    inputRef.current?.focus();
    setFocusCount((prev) => prev + 1);
  }, []);

  // useMemo - memoizes expensive calculations
  const expensiveCalculation = useMemo(() => {
    console.log("Calculating expensive value...");
    return counter.count * counter.count * Math.PI;
  }, [counter.count]);

  return (
    <article className="section">
      <header>
        <h2>Advanced Hooks & Custom Hooks</h2>
        <p>
          <strong>Concept:</strong> Custom hooks, useEffect, useRef,
          useCallback, useMemo
        </p>
      </header>

      <section>
        <h4>Custom Counter Hook:</h4>
        <p>Count: {counter.count}</p>
        <button onClick={counter.increment}>+2</button>
        <button onClick={counter.decrement}>-2</button>
        <button onClick={counter.reset}>Reset</button>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h4>Local Storage Hook:</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (saved to localStorage)"
        />
        <p>Stored name: {name}</p>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h4>Timer Hook:</h4>
        <p>Time remaining: {timer.seconds}s</p>
        <button onClick={timer.start} disabled={timer.isActive}>
          Start
        </button>
        <button onClick={timer.pause} disabled={!timer.isActive}>
          Pause
        </button>
        <button onClick={timer.reset}>Reset</button>
        {timer.seconds === 0 && <p style={{ color: "red" }}>Time's up! ⏰</p>}
      </section>

      <section style={{ marginTop: "20px" }}>
        <h4>useRef & useCallback:</h4>
        <input
          ref={inputRef}
          type="text"
          placeholder="Click button to focus me"
        />
        <button onClick={handleFocusInput}>Focus Input</button>
        <p>Focus count: {focusCount}</p>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h4>useMemo (Expensive Calculation):</h4>
        <p>Counter² × π = {expensiveCalculation.toFixed(2)}</p>
        <small>
          Check console - calculation only runs when counter changes
        </small>
      </section>

      <aside style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
        <strong>Key concepts:</strong>
        <ul>
          <li>
            <strong>Custom Hooks:</strong> Reusable stateful logic (useCounter,
            useLocalStorage, useTimer)
          </li>
          <li>
            <strong>useEffect:</strong> Side effects, cleanup, dependency arrays
          </li>
          <li>
            <strong>useRef:</strong> DOM access and mutable values that don't
            trigger re-renders
          </li>
          <li>
            <strong>useCallback:</strong> Memoize functions to prevent
            unnecessary re-renders
          </li>
          <li>
            <strong>useMemo:</strong> Memoize expensive calculations
          </li>
          <li>
            <strong>Dependency Arrays:</strong> Control when effects and memos
            run
          </li>
        </ul>
      </aside>
    </article>
  );
};

export default HooksExample;
