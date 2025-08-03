import React, { useState } from 'react'

// Define types for our data
interface Task {
  id: number
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

interface Person {
  id: number
  name: string
  age: number
  skills: string[]
}

const ListsExample: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Learn React', completed: true, priority: 'high' },
    { id: 2, title: 'Learn TypeScript', completed: false, priority: 'high' },
    { id: 3, title: 'Build a project', completed: false, priority: 'medium' },
  ])

  const [people] = useState<Person[]>([
    { id: 1, name: 'Alice', age: 28, skills: ['React', 'TypeScript', 'Node.js'] },
    { id: 2, name: 'Bob', age: 35, skills: ['Python', 'Django', 'PostgreSQL'] },
    { id: 3, name: 'Charlie', age: 24, skills: ['JavaScript', 'Vue.js', 'MongoDB'] },
  ])

  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')

  const toggleTask = (id: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#e74c3c'
      case 'medium': return '#f39c12'
      case 'low': return '#27ae60'
      default: return '#95a5a6'
    }
  }

  return (
    <div className="section">
      <h2>5. Lists & Array Methods</h2>
      <p><strong>Concept:</strong> Rendering lists, filtering, and array manipulation with TypeScript</p>
      
      <div>
        <h4>Task List with Filtering:</h4>
        <div style={{ marginBottom: '10px' }}>
          <button 
            onClick={() => setFilter('all')}
            style={{ background: filter === 'all' ? '#2980b9' : '#3498db' }}
          >
            All ({tasks.length})
          </button>
          <button 
            onClick={() => setFilter('completed')}
            style={{ background: filter === 'completed' ? '#2980b9' : '#3498db' }}
          >
            Completed ({tasks.filter(t => t.completed).length})
          </button>
          <button 
            onClick={() => setFilter('pending')}
            style={{ background: filter === 'pending' ? '#2980b9' : '#3498db' }}
          >
            Pending ({tasks.filter(t => !t.completed).length})
          </button>
        </div>

        {filteredTasks.map(task => (
          <div 
            key={task.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '10px',
              margin: '5px 0',
              background: task.completed ? '#d4edda' : '#fff3cd',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <input 
              type="checkbox" 
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              style={{ marginRight: '10px' }}
            />
            <span 
              style={{ 
                flex: 1, 
                textDecoration: task.completed ? 'line-through' : 'none' 
              }}
            >
              {task.title}
            </span>
            <span 
              style={{ 
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                color: 'white',
                background: getPriorityColor(task.priority),
                marginRight: '10px'
              }}
            >
              {task.priority}
            </span>
            <button 
              onClick={() => deleteTask(task.id)}
              style={{ background: '#e74c3c', fontSize: '12px', padding: '5px 10px' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>People & Skills (Nested Arrays):</h4>
        {people.map(person => (
          <div 
            key={person.id}
            style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              margin: '10px 0',
              borderRadius: '4px'
            }}
          >
            <h5>{person.name} (Age: {person.age})</h5>
            <div>
              <strong>Skills: </strong>
              {person.skills.map((skill) => (
                <span 
                  key={skill}
                  style={{ 
                    background: '#3498db',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    marginRight: '5px'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Key concepts:</strong>
        <ul>
          <li><code>Array.map()</code> - Transform arrays into JSX</li>
          <li><code>Array.filter()</code> - Filter arrays based on conditions</li>
          <li><code>key</code> prop - Required for list items in React</li>
          <li>Conditional styling and rendering</li>
          <li>Nested arrays and complex data structures</li>
        </ul>
      </div>
    </div>
  )
}

export default ListsExample