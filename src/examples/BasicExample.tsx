import React from 'react'

// This is a basic functional component with TypeScript
// Notice the React.FC type annotation - this tells TypeScript this is a React Function Component
const BasicExample: React.FC = () => {
  // TypeScript can infer the type of this string variable
  const greeting = "Hello from TypeScript!"
  
  // You can also explicitly type variables
  const count: number = 42
  const isActive: boolean = true
  
  return (
    <article className="section">
      <header>
        <h2>1. Basic Component & TypeScript Types</h2>
        <p><strong>Concept:</strong> Function components with TypeScript type annotations</p>
      </header>
      
      <section>
        <p>String: {greeting}</p>
        <p>Number: {count}</p>
        <p>Boolean: {isActive ? 'Yes' : 'No'}</p>
      </section>
      
      <aside style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Key TypeScript concepts:</strong>
        <ul>
          <li><code>React.FC</code> - Function Component type</li>
          <li><code>string</code>, <code>number</code>, <code>boolean</code> - Basic types</li>
          <li>Type inference - TypeScript can guess types automatically</li>
        </ul>
      </aside>
    </article>
  )
}

export default BasicExample