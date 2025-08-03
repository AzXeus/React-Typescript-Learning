import React from 'react'

// Define the shape of props using an interface
// This is a TypeScript interface - it describes what properties an object should have
interface UserCardProps {
  name: string
  age: number
  email: string
  isOnline?: boolean  // The ? makes this property optional
}

// A child component that receives typed props
const UserCard: React.FC<UserCardProps> = ({ name, age, email, isOnline = false }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '10px', 
      margin: '10px 0', 
      borderRadius: '4px',
      background: isOnline ? '#e8f5e8' : '#f8f8f8'
    }}>
      <h4>{name}</h4>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Status: {isOnline ? '🟢 Online' : '⚫ Offline'}</p>
    </div>
  )
}

const PropsExample: React.FC = () => {
  return (
    <div className="section">
      <h2>2. Props & Interfaces</h2>
      <p><strong>Concept:</strong> Passing data to components with TypeScript interfaces</p>
      
      <UserCard 
        name="Alice Johnson" 
        age={28} 
        email="alice@example.com" 
        isOnline={true} 
      />
      
      <UserCard 
        name="Bob Smith" 
        age={35} 
        email="bob@example.com" 
        // isOnline is optional, so we can omit it
      />
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Key concepts:</strong>
        <ul>
          <li><code>interface</code> - Defines the shape of props</li>
          <li><code>?</code> - Makes properties optional</li>
          <li>Destructuring props with default values</li>
          <li>TypeScript ensures you pass the right types</li>
        </ul>
      </div>
    </div>
  )
}

export default PropsExample