import React, { useState } from 'react'

const EventsExample: React.FC = () => {
  const [clickCount, setClickCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Event handlers with proper TypeScript types
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', event.currentTarget.textContent)
    setClickCount(prev => prev + 1)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      alert(`You pressed Enter! Value: ${inputValue}`)
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    })
  }

  // Custom event handler that takes additional parameters
  const handleCustomClick = (message: string, event: React.MouseEvent<HTMLButtonElement>) => {
    alert(`${message} - Button: ${event.button}`)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()  // Prevent page refresh
    alert(`Form submitted with: ${inputValue}`)
  }

  return (
    <div className="section">
      <h2>4. Event Handling</h2>
      <p><strong>Concept:</strong> Handling user interactions with proper TypeScript event types</p>
      
      <div>
        <h4>Click Events:</h4>
        <button onClick={handleButtonClick}>
          Click me! (Clicked {clickCount} times)
        </button>
        <button onClick={(e) => handleCustomClick('Custom message', e)}>
          Custom Click Handler
        </button>
      </div>

      <div style={{ marginTop: '15px' }}>
        <h4>Input Events:</h4>
        <input 
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type and press Enter..."
        />
        <p>Current value: {inputValue}</p>
      </div>

      <div style={{ marginTop: '15px' }}>
        <h4>Mouse Events:</h4>
        <div 
          onMouseMove={handleMouseMove}
          style={{ 
            height: '100px', 
            background: '#f0f0f0', 
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'crosshair'
          }}
        >
          Move your mouse here! Position: ({mousePosition.x}, {mousePosition.y})
        </div>
      </div>

      <div style={{ marginTop: '15px' }}>
        <h4>Form Events:</h4>
        <form onSubmit={handleFormSubmit}>
          <input 
            type="text" 
            value={inputValue} 
            onChange={handleInputChange}
            placeholder="Enter something and submit..."
          />
          <button type="submit">Submit Form</button>
        </form>
      </div>
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Key concepts:</strong>
        <ul>
          <li><code>React.MouseEvent&lt;HTMLButtonElement&gt;</code> - Typed mouse events</li>
          <li><code>React.ChangeEvent&lt;HTMLInputElement&gt;</code> - Typed input events</li>
          <li><code>React.KeyboardEvent</code> - Keyboard event handling</li>
          <li><code>event.preventDefault()</code> - Preventing default behavior</li>
          <li>Inline event handlers vs separate functions</li>
        </ul>
      </div>
    </div>
  )
}

export default EventsExample