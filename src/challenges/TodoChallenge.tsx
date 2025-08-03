import React, { useState, useRef, useEffect } from 'react'

// TODO: Define the Todo interface
// interface Todo {
//   id: number
//   text: string
//   completed: boolean
//   priority: 'low' | 'medium' | 'high'
//   createdAt: Date
// }

enum Priority {
  LOW,
  MEDIUM,
  HIGH
};

interface Todo {
  id: number
  text: string
  completed: boolean
  priority: Priority
  createdAt: Date
};

const TodoChallenge: React.FC = () => {
  // TODO: Add state for todos, input value, filter, etc.

const [todos, setTodos] = useState<Todo[]>([]);
const [filter, setFilter] = useState<"all" | "active" | "completed">();
const [sort, setSort] = useState<"date" | "priority" | "alphabetical">();
const [lastId, setLastId] = useState<number>(0);
const [todoError, setTodoError] = useState<string>("");
const formRef = useRef<HTMLFormElement>(null);

const isValidSortOption = (value: string): value is "date" | "priority" | "alphabetical" => {
  return ['date', 'priority', 'alphabetical'].includes(value);
};

function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
  const value = event.currentTarget.value;
  if (isValidSortOption(value)) {
    setSort(value);
  }
}

function handleClearComplete(event: React.MouseEvent<HTMLButtonElement>) {
  setTodos(prev => prev.filter(todo => !todo.completed));
}

function getPriority(): Priority {
  const value = (formRef.current?.querySelector('select') as HTMLSelectElement)?.value;
  
  // Map string values to enum numbers
  switch (value) {
    case 'low': return Priority.LOW;
    case 'medium': return Priority.MEDIUM;
    case 'high': return Priority.HIGH;
    default: return Priority.LOW;
  }
}

function getPriorityString(priority: Priority): string {
  switch (priority) {
    case Priority.LOW: return 'low';
    case Priority.MEDIUM: return 'medium';
    case Priority.HIGH: return 'high';
    default: return 'low';
  }
}

function handleTodoSubmit(event: React.FormEvent) {
  event.preventDefault();

  if(formRef.current?.querySelector('input')?.value === "") {
    setTodoError(() => "Cannot be blank!");
    return;
  } else {
    setTodoError(() => "");
  }

  const newTodo: Todo = {
    id: lastId,
    text: formRef.current?.querySelector('input')?.value ?? "",
    completed: false,
    priority: getPriority(),
    createdAt: new Date
  };
  setLastId(() => lastId+1);

  setTodos(prev => prev.concat(newTodo));
}

function handleDeleteButton(todoId: number) {
  setTodos(prev => prev.filter(todo => todo.id !== todoId));
}

function handleCheckboxChange(todoId: number) {
  setTodos(prev => prev.map(todo => {
    if(todo.id === todoId) return { ...todo, completed: !todo.completed };
    return todo;
  }));
}

function handleTextChange(todoId: number, text: string) {
  setTodos(prev => prev.map(todo => {
    if(todo.id === todoId) return { ...todo, text: text };
    return todo;
  }));
}

const getPriorityColor = (priority: Todo['priority']) => {
  switch (priority) {
    case Priority.HIGH: return '#e74c3c'
    case Priority.MEDIUM: return '#f39c12'
    case Priority.LOW: return '#27ae60'
    default: return '#95a5a6'
  }
}

const todoStyles = {
  priorityBadge: {
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    color: 'white',
    marginRight: '5px'
  },
  todoCard: { 
    display: 'flex', 
    alignItems: 'center', 
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  deleteButton: {
    background: '#e74c3c',
    fontSize: '12px',
    padding: '5px 10px'
  }
};

const TodoCard: React.FC<Todo> = ({ id, text, completed, priority, createdAt }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleInputEditLoseFocus(event: React.FocusEvent<HTMLInputElement>) {
    setIsEditing(() => false);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>, todoId: number) {
    if(event.key === "Enter") {
      handleTextChange(todoId, event.currentTarget.value);
    }
    if(event.key === "Escape") {
      event.currentTarget.blur();
    }
  }

  function handleTodoDoubleClick(event: React.MouseEvent<HTMLSpanElement>) {
    setIsEditing(() => true);
  }
  
  const EditableSpan: React.FC<{ text: string; completed: boolean; }> = ({ text, completed }) => {

    return (
      <span onDoubleClick={handleTodoDoubleClick} style={{ flex: 1, textDecoration: completed ? 'line-through' : 'none' }}>{text}</span>
    );
  }
  
  const EditingInput: React.FC<{ text: string; }> = ({ text }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, []);
  
    return (
      <input ref={inputRef} onBlur={handleInputEditLoseFocus} onKeyDown={(e) => handleKeyPress(e, id)} defaultValue={text} style={{ flex: 1 }}></input>
    )
  }

  return(
    <div style={{ ...todoStyles.todoCard, background: completed ? '#d4edda' : '#fff3cd' }}>
      <input name='completed' type='checkbox' checked={completed} onChange={() => handleCheckboxChange(id)} style={{ marginRight: '10px' }}></input>
      {isEditing ? <EditingInput text={text} /> : <EditableSpan text={text} completed={completed} />}
      <span style={{ marginRight: '5px' }}>Created On: {createdAt.toDateString()}</span>
      <span style={{ ...todoStyles.priorityBadge, background: getPriorityColor(priority) }}>{getPriorityString(priority)}</span>
      <button style={todoStyles.deleteButton} onClick={() => handleDeleteButton(id)}>Delete</button>
      <sub>{id}</sub>
    </div>
  )
}

const filteredTodos = todos.filter(todo => {
  if(filter === 'active') return !todo.completed;
  if(filter === 'completed') return todo.completed;
  return true;
});

const sortedFilteredTodos = filteredTodos.sort((a, b) => {
  switch(sort) {
    case 'date':
      return a.createdAt.valueOf() - b.createdAt.valueOf();
      break;
    case 'priority':
      return a.priority - b.priority;
      break;
    case 'alphabetical':
      return a.text.localeCompare(b.text);
      break;
  }
  return 1;
});

  return (
    <div className="section">
      <div className="challenge">
        <h3>🎯 Challenge 2: Advanced Todo List</h3>
        <p><strong>Your mission:</strong> Build a todo list with these features:</p>
        <ul>
          <s><li>✅ Add new todos with text and priority</li></s>
          <s><li>✅ Mark todos as complete/incomplete</li></s>
          <s><li>✅ Delete todos</li></s>
          <s><li>✅ Edit existing todos (double-click to edit)</li></s>
          <s><li>✅ Filter by: All, Active, Completed</li></s>
          <s><li>✅ Sort by: Date created, Priority, Alphabetical</li></s>
          <s><li>✅ Show creation date for each todo</li></s>
          <s><li>✅ Clear all completed todos</li></s>
          <s><li>✅ Show statistics (total, completed, remaining)</li></s>
          <s><li>✅ Prevent adding empty todos</li></s>
        </ul>
      </div>

      {/* TODO: Replace this placeholder with your implementation */}
      <div style={{ padding: '20px', border: '2px dashed #ccc' }}>
        <h4>Your Todo List Implementation Goes Here</h4>
        
        {/* Add todo form */}
        <form onSubmit={handleTodoSubmit} ref={formRef}>
          <div style={{ marginBottom: '20px' }}>
            <input name='title' type="text" placeholder="Add a new todo..." />
            <select name='priority'>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button name='submit' type='submit'>Add Todo</button>
            {todoError && <p style={{ color: '#e74c3c', fontSize: '12px' }}>{todoError}</p>}
          </div>
        </form>

        {/* Filters and sorting */}
        <div style={{ marginBottom: '20px' }}>
          <div>
            <strong>Filter: </strong>
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("active")}>Active</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
          </div>
          <div style={{ marginTop: '10px' }}>
            <strong>Sort by: </strong>
            <select onChange={handleSortChange} name='sort by'>
              <option value="date">Date Created</option>
              <option value="priority">Priority</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div style={{ marginBottom: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
          <strong>Stats:</strong> Total: [{todos.length}] | Completed: [{todos.filter(todo => todo.completed).length}] | Remaining: [{todos.filter(todo => !todo.completed).length}]
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
          {sortedFilteredTodos.map(todo => {
            return <TodoCard key={todo.id} {...todo} />
          })}
        </div>

        {/* Clear completed button */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleClearComplete} style={{ background: '#e74c3c' }}>Clear Completed</button>
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