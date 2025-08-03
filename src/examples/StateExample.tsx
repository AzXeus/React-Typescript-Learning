import React, { useState } from 'react'

const StateExample: React.FC = () => {
  // useState with TypeScript - the type is inferred from the initial value
  const [count, setCount] = useState(0)  // TypeScript knows this is number
  const [message, setMessage] = useState('')  // TypeScript knows this is string
  
  // You can also explicitly type useState if needed
  const [user, setUser] = useState<{ name: string; age: number } | null>(null)
  
  // For more complex state, define an interface
  interface Settings {
    theme: 'light' | 'dark'  // Union type - can only be 'light' or 'dark'
    notifications: boolean
  }
  
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    notifications: true
  })

  const handleCreateUser = () => {
    setUser({ name: 'John Doe', age: 30 })
  }

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,  // Spread operator to keep other properties
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }))
  }

  return (
    <div className="section">
      <h2>3. State Management with useState</h2>
      <p><strong>Concept:</strong> Managing component state with TypeScript</p>
      
      <div>
        <h4>Simple State:</h4>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      <div style={{ marginTop: '15px' }}>
        <h4>String State:</h4>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <p>You typed: {message}</p>
      </div>

      <div style={{ marginTop: '15px' }}>
        <h4>Object State:</h4>
        <button onClick={handleCreateUser}>Create User</button>
        {user && (
          <p>User: {user.name}, Age: {user.age}</p>
        )}
      </div>

      <div style={{ marginTop: '15px' }}>
        <h4>Complex State with Interface:</h4>
        <p>Theme: {settings.theme}</p>
        <p>Notifications: {settings.notifications ? 'On' : 'Off'}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <button onClick={() => setSettings(prev => ({ ...prev, notifications: !prev.notifications }))}>
          Toggle Notifications
        </button>
      </div>
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Key concepts:</strong>
        <ul>
          <li><code>useState&lt;Type&gt;</code> - Explicitly typing state</li>
          <li>Union types: <code>'light' | 'dark'</code></li>
          <li>Spread operator for updating objects</li>
          <li>Optional chaining and conditional rendering</li>
        </ul>
      </div>
    </div>
  )
}

export default StateExample