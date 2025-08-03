import React, { useState } from 'react'

// TODO: Define the Todo interface
// interface Todo {
//   id: number
//   text: string
//   completed: boolean
//   priority: 'low' | 'medium' | 'high'
//   createdAt: Date
// }

const TodoChallenge: React.FC = () => {
  // TODO: Add state for todos, input value, filter, etc.

  return (
    <div className="section">
      <div className="challenge">
        <h3>🎯 Challenge 2: Advanced Todo List</h3>
        <p><strong>Your mission:</strong> Build a todo list with these features:</p>
        <ul>
          <li>✅ Add new todos with text and priority</li>
          <li>✅ Mark todos as complete/incomplete</li>
          <li>✅ Delete todos</li>
          <li>✅ Edit existing todos (double-click to edit)</li>
          <li>✅ Filter by: All, Active, Completed</li>
          <li>✅ Sort by: Date created, Priority, Alphabetical</li>
          <li>✅ Show creation date for each todo</li>
          <li>✅ Clear all completed todos</li>
          <li>✅ Show statistics (total, completed, remaining)</li>
          <li>✅ Prevent adding empty todos</li>
        </ul>
      </div>

      {/* TODO: Replace this placeholder with your implementation */}
      <div style={{ padding: '20px', border: '2px dashed #ccc' }}>
        <h4>Your Todo List Implementation Goes Here</h4>
        
        {/* Add todo form */}
        <div style={{ marginBottom: '20px' }}>
          <input type="text" placeholder="Add a new todo..." disabled />
          <select disabled>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button disabled>Add Todo</button>
        </div>

        {/* Filters and sorting */}
        <div style={{ marginBottom: '20px' }}>
          <div>
            <strong>Filter: </strong>
            <button disabled>All</button>
            <button disabled>Active</button>
            <button disabled>Completed</button>
          </div>
          <div style={{ marginTop: '10px' }}>
            <strong>Sort by: </strong>
            <select disabled>
              <option value="date">Date Created</option>
              <option value="priority">Priority</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div style={{ marginBottom: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
          <strong>Stats:</strong> Total: [X] | Completed: [X] | Remaining: [X]
        </div>

        {/* Todo list */}
        <div>
          <p>Your todos will appear here...</p>
          {/* Each todo should show:
              - Checkbox for completion
              - Text (editable on double-click)
              - Priority badge
              - Creation date
              - Delete button
          */}
        </div>

        {/* Clear completed button */}
        <div style={{ marginTop: '20px' }}>
          <button disabled style={{ background: '#e74c3c' }}>Clear Completed</button>
        </div>
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Hints:</strong>
        <ul>
          <li>Use <code>Date.now()</code> or <code>new Date()</code> for unique IDs and timestamps</li>
          <li>Create separate functions for add, delete, toggle, edit operations</li>
          <li>Use <code>Array.filter()</code> and <code>Array.sort()</code> for filtering and sorting</li>
          <li>For editing, you might need additional state to track which todo is being edited</li>
          <li>Use conditional rendering to show different UI states</li>
          <li>Remember to validate input before adding todos</li>
        </ul>
      </div>
    </div>
  )
}

export default TodoChallenge