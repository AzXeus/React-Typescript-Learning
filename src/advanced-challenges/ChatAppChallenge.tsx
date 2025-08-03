import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'

// TODO: Define your interfaces and types
// interface Message {
//   id: string
//   text: string
//   author: string
//   timestamp: Date
//   type: 'user' | 'system'
// }

// interface User {
//   id: string
//   name: string
//   isOnline: boolean
//   lastSeen: Date
// }

const ChatAppChallenge: React.FC = () => {
  // TODO: Implement your state management here
  // You'll need state for:
  // - messages: Message[]
  // - users: User[]
  // - currentUser: string
  // - typingUsers: string[]
  // - searchTerm: string
  // - selectedFilter: 'all' | 'user' | 'system'

  return (
    <article className="section">
      <div className="challenge">
        <h3>🎯 Advanced Challenge 1: Real-time Chat App</h3>
        <p><strong>Your mission:</strong> Build a sophisticated chat application with these features:</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '15px 0' }}>
          <div>
            <h4>Core Features:</h4>
            <ul>
              <li>✅ Send and receive messages</li>
              <li>✅ Multiple users with online status</li>
              <li>✅ Message timestamps</li>
              <li>✅ System messages (user joined/left)</li>
              <li>✅ Auto-scroll to latest message</li>
              <li>✅ Message search with highlighting</li>
              <li>✅ Filter messages by type</li>
            </ul>
          </div>
          <div>
            <h4>Advanced Features:</h4>
            <ul>
              <li>✅ "User is typing..." indicator</li>
              <li>✅ Virtual scrolling for performance</li>
              <li>✅ Keyboard shortcuts (Ctrl+Enter to send)</li>
              <li>✅ Custom emoji reactions</li>
              <li>✅ Message editing (double-click)</li>
              <li>✅ Persistent chat history (localStorage)</li>
              <li>✅ Dark/light theme toggle</li>
            </ul>
          </div>
        </div>
      </div>

      {/* TODO: Replace this placeholder with your implementation */}
      <div style={{ padding: '20px', border: '2px dashed #ccc', minHeight: '600px' }}>
        <h4>Your Chat App Implementation Goes Here</h4>
        
        {/* Chat Header */}
        <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
          <h5>Chat Room - [X] users online</h5>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
            <input type="text" placeholder="Search messages..." disabled />
            <select disabled>
              <option value="all">All Messages</option>
              <option value="user">User Messages</option>
              <option value="system">System Messages</option>
            </select>
            <button disabled>🌙 Dark Mode</button>
          </div>
        </div>

        {/* Online Users */}
        <div style={{ marginBottom: '20px' }}>
          <strong>Online Users:</strong>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            {/* TODO: Render online users with status indicators */}
            <span style={{ padding: '4px 8px', background: '#e8f5e8', borderRadius: '12px', fontSize: '12px' }}>
              🟢 You
            </span>
            <span style={{ padding: '4px 8px', background: '#f0f0f0', borderRadius: '12px', fontSize: '12px' }}>
              ⚫ User (offline)
            </span>
          </div>
        </div>

        {/* Messages Area */}
        <div style={{ 
          height: '300px', 
          border: '1px solid #ddd', 
          borderRadius: '4px', 
          padding: '10px',
          overflowY: 'auto',
          background: '#fafafa',
          marginBottom: '10px'
        }}>
          <p style={{ textAlign: 'center', color: '#666' }}>Messages will appear here...</p>
          {/* TODO: Implement virtual scrolling for messages */}
          {/* Each message should show:
              - Author name and timestamp
              - Message text with search highlighting
              - Reaction buttons
              - Edit functionality (double-click)
              - Different styling for user vs system messages
          */}
        </div>

        {/* Typing Indicator */}
        <div style={{ minHeight: '20px', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
          {/* TODO: Show "User is typing..." */}
        </div>

        {/* Message Input */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Type a message... (Ctrl+Enter to send)"
            style={{ flex: 1 }}
            disabled
          />
          <button disabled>😀</button>
          <button disabled>Send</button>
        </div>

        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <strong>Keyboard Shortcuts:</strong> Ctrl+Enter (send), Ctrl+F (search), Ctrl+D (dark mode)
        </div>
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <strong>Advanced Concepts to Use:</strong>
        <ul>
          <li><strong>Custom Hooks:</strong> useChat, useTyping, useLocalStorage, useKeyboardShortcuts</li>
          <li><strong>Performance:</strong> useMemo for filtered messages, useCallback for event handlers</li>
          <li><strong>Events:</strong> Custom events for user actions, keyboard shortcuts</li>
          <li><strong>useEffect:</strong> Auto-scroll, typing timeouts, localStorage sync</li>
          <li><strong>useRef:</strong> Message container scrolling, input focus management</li>
          <li><strong>Complex State:</strong> Multiple related state pieces, optimistic updates</li>
        </ul>
      </div>
    </article>
  )
}

export default ChatAppChallenge