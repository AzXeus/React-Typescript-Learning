import React, { useState, useRef } from 'react'

const CounterChallenge: React.FC = () => {
  // TODO: Implement the counter functionality
  // You'll need to add state and event handlers

  const [counter, setCounter] = useState(0);
  const [counterSteps, setSteps] = useState(1);
  const customValueRef = useRef<HTMLInputElement>(null);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    setSteps(Number(value));
  }

  return (
    <div className="section">
      <div className="challenge">
        <h3>🎯 Challenge 1: Enhanced Counter</h3>
        <p><strong>Your mission:</strong> Build a counter with the following features:</p>
        <ul>
          <s><li>✅ Basic increment/decrement buttons</li></s>
          <s><li>✅ Reset button</li></s>
          <s><li>✅ Input field to set a custom value</li></s>
          <s><li>✅ Step size selector (1, 5, 10)</li></s>
          <s><li>✅ Color changes: green when positive, red when negative, blue when zero</li></s>
          <s><li>✅ Disable decrement when count is 0 or below</li></s>
          <s><li>✅ Show a message when count reaches 100</li></s>
        </ul>
      </div>

      {/* TODO: Replace this placeholder with your implementation */}
      <div style={{ padding: '20px', border: '2px dashed #ccc', textAlign: 'center' }}>
        <h4>Your Counter Implementation Goes Here</h4>
        <p style={ counter === 0 ? {color: 'blue'} : counter > 0 ? {color: 'green'} : counter < 0 ? {color: 'red'} : {} }>Current count: {counter}</p>
        <p>Step size: {counterSteps}</p>
        <p>{counter >= 100 ? "counter reached 100!" : ""}</p>
        
        {/* Add your buttons and inputs here */}
        <button onClick={() => counter <= 0 ? null : setCounter(counter - counterSteps)}>-</button>
        <button onClick={() => setCounter(counter + counterSteps)}>+</button>
        <button onClick={() => setCounter(0)}>Reset</button>
        
        <div style={{ marginTop: '10px' }}>
          <input name='custom value' type="number" placeholder="Set custom value" ref={customValueRef} />
          <button onClick={() => setCounter(Number(customValueRef.current?.value))}>Set</button>
        </div>
        
        <div style={{ marginTop: '10px' }}>
          <label>Step size: 
            <select onChange={handleSelectChange} name='step size'>
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </label>
        </div>
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Hints:</strong>
        <ul>
          <li>Use <code>useState</code> for count, step size, and custom input value</li>
          <li>Create separate functions for increment, decrement, reset, and set custom value</li>
          <li>Use conditional styling for the color changes</li>
          <li>Use the <code>disabled</code> prop for buttons when needed</li>
          <li>Remember to handle the input change events properly</li>
        </ul>
      </div>
    </div>
  )
}

export default CounterChallenge