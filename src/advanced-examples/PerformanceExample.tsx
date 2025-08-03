import React, { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react'

// Expensive calculation function
const expensiveCalculation = (num: number): number => {
  console.log('🔥 Running expensive calculation...')
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(num * i)
  }
  return result
}

// Component that re-renders frequently (bad example)
const ExpensiveComponent: React.FC<{ value: number; onUpdate: () => void }> = ({ value, onUpdate }) => {
  console.log('🔄 ExpensiveComponent re-rendered')
  
  // This calculation runs on every render - BAD!
  const badResult = expensiveCalculation(value)
  
  return (
    <div style={{ padding: '10px', border: '1px solid red', margin: '5px 0' }}>
      <h5 style={{ color: 'red' }}>❌ Bad: Expensive Component (no optimization)</h5>
      <p>Value: {value}</p>
      <p>Expensive result: {badResult.toFixed(2)}</p>
      <button onClick={onUpdate}>Update</button>
    </div>
  )
}

// Optimized component using useMemo
const OptimizedComponent: React.FC<{ value: number; onUpdate: () => void }> = ({ value, onUpdate }) => {
  console.log('🔄 OptimizedComponent re-rendered')
  
  // This calculation only runs when 'value' changes - GOOD!
  const goodResult = useMemo(() => expensiveCalculation(value), [value])
  
  return (
    <div style={{ padding: '10px', border: '1px solid green', margin: '5px 0' }}>
      <h5 style={{ color: 'green' }}>✅ Good: Optimized Component (useMemo)</h5>
      <p>Value: {value}</p>
      <p>Expensive result: {goodResult.toFixed(2)}</p>
      <button onClick={onUpdate}>Update</button>
    </div>
  )
}

// Child component that re-renders unnecessarily
const ChildComponent: React.FC<{ name: string; onClick: () => void }> = ({ name, onClick }) => {
  console.log(`🔄 ChildComponent "${name}" re-rendered`)
  
  return (
    <div style={{ padding: '8px', border: '1px solid orange', margin: '3px' }}>
      <span>{name}</span>
      <button onClick={onClick} style={{ marginLeft: '10px' }}>Click me</button>
    </div>
  )
}

// Memoized child component - only re-renders when props change
const MemoizedChildComponent = memo<{ name: string; onClick: () => void }>(({ name, onClick }) => {
  console.log(`🔄 MemoizedChildComponent "${name}" re-rendered`)
  
  return (
    <div style={{ padding: '8px', border: '1px solid blue', margin: '3px' }}>
      <span>{name} (memoized)</span>
      <button onClick={onClick} style={{ marginLeft: '10px' }}>Click me</button>
    </div>
  )
})

// Virtual scrolling example for large lists
const VirtualScrollList: React.FC<{ items: string[] }> = ({ items }) => {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const itemHeight = 50
  const containerHeight = 300
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length)
  
  const visibleItems = items.slice(startIndex, endIndex)
  
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop)
  }
  
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
      <h5>Virtual Scrolling (renders only visible items)</h5>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: containerHeight,
          overflow: 'auto',
          position: 'relative'
        }}
      >
        <div style={{ height: items.length * itemHeight, position: 'relative' }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{
                position: 'absolute',
                top: (startIndex + index) * itemHeight,
                left: 0,
                right: 0,
                height: itemHeight,
                padding: '10px',
                borderBottom: '1px solid #eee',
                background: (startIndex + index) % 2 === 0 ? '#f9f9f9' : 'white'
              }}
            >
              Item {startIndex + index + 1}: {item}
            </div>
          ))}
        </div>
      </div>
      <small>Showing items {startIndex + 1}-{endIndex} of {items.length}</small>
    </div>
  )
}

// Debounced input hook
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const PerformanceExample: React.FC = () => {
  const [count, setCount] = useState(0)
  const [expensiveValue, setExpensiveValue] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  // Generate large list for virtual scrolling
  const largeList = useMemo(() => 
    Array.from({ length: 10000 }, (_, i) => `Item ${i + 1} - ${Math.random().toString(36).substr(2, 9)}`)
  , [])
  
  // Filtered list based on debounced search
  const filteredList = useMemo(() => 
    largeList.filter(item => 
      item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  , [largeList, debouncedSearchTerm])

  // Bad callback - creates new function on every render
  const badCallback = () => {
    console.log('Bad callback called')
  }

  // Good callback - memoized with useCallback
  const goodCallback = useCallback(() => {
    console.log('Good callback called')
  }, [])

  // Callback that depends on state
  const dependentCallback = useCallback(() => {
    console.log('Callback with dependency:', count)
  }, [count])

  return (
    <article className="section">
      <header>
        <h2>Performance Optimization</h2>
        <p><strong>Concept:</strong> useMemo, useCallback, memo, virtual scrolling, debouncing</p>
      </header>

      <section>
        <h4>useMemo for Expensive Calculations:</h4>
        <p>Counter: {count} (change this to see re-renders)</p>
        <button onClick={() => setCount(c => c + 1)}>Increment Counter</button>
        
        <p style={{ marginTop: '10px' }}>Expensive value: {expensiveValue}</p>
        <button onClick={() => setExpensiveValue(v => v + 1)}>Change Expensive Value</button>
        
        <div style={{ marginTop: '15px' }}>
          <ExpensiveComponent value={expensiveValue} onUpdate={() => setCount(c => c + 1)} />
          <OptimizedComponent value={expensiveValue} onUpdate={() => setCount(c => c + 1)} />
        </div>
        
        <p><strong>Check the console:</strong> The optimized component only recalculates when expensiveValue changes!</p>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h4>React.memo for Component Optimization:</h4>
        <p>Counter: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>Increment (watch console)</button>
        
        <div style={{ marginTop: '10px' }}>
          <h5>Without memo (re-renders on every parent update):</h5>
          <ChildComponent name="Child 1" onClick={badCallback} />
          <ChildComponent name="Child 2" onClick={badCallback} />
          
          <h5>With memo (only re-renders when props change):</h5>
          <MemoizedChildComponent name="Memoized 1" onClick={goodCallback} />
          <MemoizedChildComponent name="Memoized 2" onClick={dependentCallback} />
        </div>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h4>Debounced Search:</h4>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items... (debounced 500ms)"
          style={{ width: '300px' }}
        />
        <p>Search term: "{searchTerm}"</p>
        <p>Debounced term: "{debouncedSearchTerm}"</p>
        <p>Filtered results: {filteredList.length} items</p>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h4>Virtual Scrolling for Large Lists:</h4>
        <p>Rendering {filteredList.length} items efficiently:</p>
        <VirtualScrollList items={filteredList} />
      </section>

      <aside style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Key performance concepts:</strong>
        <ul>
          <li><strong>useMemo:</strong> Memoize expensive calculations</li>
          <li><strong>useCallback:</strong> Memoize functions to prevent child re-renders</li>
          <li><strong>React.memo:</strong> Memoize components to prevent unnecessary re-renders</li>
          <li><strong>Virtual Scrolling:</strong> Only render visible items in large lists</li>
          <li><strong>Debouncing:</strong> Delay expensive operations like API calls</li>
          <li><strong>Dependency Arrays:</strong> Control when memoization updates</li>
        </ul>
      </aside>
    </article>
  )
}

export default PerformanceExample