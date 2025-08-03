import React, { useState } from 'react'

const CounterChallenge: React.FC = () => {
  // TODO: Implement the counter functionality
  // You'll need to add state and event handlers

  return (
    <div className="section">
      <div className="challenge">
        <h3>🎯 Challenge 1: Enhanced Counter</h3>
        <p><strong>Your mission:</strong> Build a counter with the following features:</p>
        <ul>
          <li>✅ Basic increment/decrement buttons</li>
          <li>✅ Reset button</li>
          <li>✅ Input field to set a custom value</li>
          <li>✅ Step size selector (1, 5, 10)</li>
          <li>✅ Color changes: green when positive, red when negative, blue when zero</li>
          <li>✅ Disable decrement when count is 0 or below</li>
          <li>✅ Show a message when count reaches 100</li>
        </ul>
      </div>

      {/* TODO: Replace this placeholder with your implementation */}
      <div style={{ padding: '20px', border: '2px dashed #ccc', textAlign: 'center' }}>
        <h4>Your Counter Implementation Goes Here</h4>
        <p>Current count: [implement me]</p>
        <p>Step size: [implement me]</p>
        
        {/* Add your buttons and inputs here */}
        <button disabled>- (implement me)</button>
        <button disabled>+ (implement me)</button>
        <button disabled>Reset (implement me)</button>
        
        <div style={{ marginTop: '10px' }}>
          <input type="number" placeholder="Set custom value" disabled />
          <button disabled>Set</button>
        </div>
        
        <div style={{ marginTop: '10px' }}>
          <label>Step size: </label>
          <select disabled>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
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