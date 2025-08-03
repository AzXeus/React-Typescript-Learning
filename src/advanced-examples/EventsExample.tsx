import React, { useState, useRef, useEffect } from "react";

// Custom event types
interface CustomEventData {
  message: string;
  timestamp: number;
  source: string;
}

// Custom hook for event handling
const useCustomEvent = (eventName: string) => {
  const [eventData, setEventData] = useState<CustomEventData | null>(null);

  useEffect(() => {
    const handleCustomEvent = (event: Event) => {
      const customEvent = event as CustomEvent<CustomEventData>;
      setEventData(customEvent.detail);
    };

    window.addEventListener(eventName, handleCustomEvent);
    return () => window.removeEventListener(eventName, handleCustomEvent);
  }, [eventName]);

  const dispatchEvent = (data: CustomEventData) => {
    const customEvent = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(customEvent);
  };

  return { eventData, dispatchEvent };
};

// Component that dispatches events
const EventDispatcher: React.FC = () => {
  const { dispatchEvent } = useCustomEvent("app:notification");
  const [message, setMessage] = useState("");

  const handleSendNotification = () => {
    if (message.trim()) {
      dispatchEvent({
        message: message.trim(),
        timestamp: Date.now(),
        source: "EventDispatcher",
      });
      setMessage("");
    }
  };

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        margin: "10px 0",
      }}
    >
      <h5>Event Dispatcher</h5>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter notification message"
        onKeyPress={(e) => e.key === "Enter" && handleSendNotification()}
      />
      <button onClick={handleSendNotification}>Send Notification</button>
    </div>
  );
};

// Component that listens for events
const EventListener: React.FC = () => {
  const { eventData } = useCustomEvent("app:notification");
  const [notifications, setNotifications] = useState<CustomEventData[]>([]);

  useEffect(() => {
    if (eventData) {
      setNotifications((prev) => [eventData, ...prev].slice(0, 5)); // Keep last 5
    }
  }, [eventData]);

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        margin: "10px 0",
      }}
    >
      <h5>Event Listener</h5>
      <p>Listening for 'app:notification' events...</p>
      {notifications.length === 0 ? (
        <p style={{ color: "#666", fontStyle: "italic" }}>
          No notifications yet
        </p>
      ) : (
        <div>
          {notifications.map((notification, index) => (
            <div
              key={notification.timestamp}
              style={{
                padding: "8px",
                margin: "5px 0",
                background: "#f0f8ff",
                borderRadius: "4px",
                opacity: 1 - index * 0.15, // Fade older notifications
              }}
            >
              <strong>{notification.message}</strong>
              <br />
              <small>
                From: {notification.source} at{" "}
                {new Date(notification.timestamp).toLocaleTimeString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Advanced event handling with keyboard shortcuts
const KeyboardShortcuts: React.FC = () => {
  const [shortcuts, setShortcuts] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!isListening) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault(); 
      // Create shortcut string
      const parts = [];
      if (event.ctrlKey) parts.push("Ctrl");
      if (event.altKey) parts.push("Alt");
      if (event.shiftKey) parts.push("Shift");
      if (
        event.key !== "Control" &&
        event.key !== "Alt" &&
        event.key !== "Shift"
      ) {
        parts.push(event.key.toUpperCase());
      }

      if (parts.length > 1) {
        // Only log if it's actually a shortcut
        const shortcut = parts.join(" + ");
        setShortcuts((prev) => [shortcut, ...prev].slice(0, 10));

        // Handle specific shortcuts
        if (event.ctrlKey && event.key === "s") {
          event.preventDefault();
          alert("Save shortcut detected!");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isListening]);

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        margin: "10px 0",
      }}
    >
      <h5>Keyboard Shortcuts</h5>
      <button onClick={() => setIsListening(!isListening)}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <button onClick={() => setShortcuts([])} style={{ marginLeft: "10px" }}>
        Clear History
      </button>

      {isListening && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          🎧 Listening for keyboard shortcuts... Try Ctrl+S!
        </p>
      )}

      <div style={{ marginTop: "10px" }}>
        <strong>Recent shortcuts:</strong>
        {shortcuts.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>
            No shortcuts detected
          </p>
        ) : (
          <ul>
            {shortcuts.map((shortcut, index) => (
              <li
                key={index}
                style={{
                  opacity: 1 - index * 0.1,
                  fontFamily: "monospace",
                }}
              >
                {shortcut}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Drag and drop example
const DragDropExample: React.FC = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  const items = ["🍎 Apple", "🍌 Banana", "🍊 Orange", "🍇 Grapes"];

  const handleDragStart = (event: React.DragEvent, item: string) => {
    setDraggedItem(item);
    event.dataTransfer.setData("text/plain", item);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Allow drop
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const item = event.dataTransfer.getData("text/plain");
    if (item && !droppedItems.includes(item)) {
      setDroppedItems((prev) => [...prev, item]);
    }
    setDraggedItem(null);
  };

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        margin: "10px 0",
      }}
    >
      <h5>Drag & Drop</h5>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <strong>Drag from here:</strong>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "10px",
            }}
          >
            {items.map((item) => (
              <div
                key={item}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                style={{
                  padding: "8px",
                  background: draggedItem === item ? "#e3f2fd" : "#f5f5f5",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "grab",
                  userSelect: "none",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <strong>Drop here:</strong>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              minHeight: "150px",
              width: "200px",
              border: "2px dashed #ccc",
              borderRadius: "4px",
              padding: "10px",
              marginTop: "10px",
              background: "#fafafa",
            }}
          >
            {droppedItems.length === 0 ? (
              <p
                style={{
                  color: "#666",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                Drop items here
              </p>
            ) : (
              droppedItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "5px",
                    margin: "5px 0",
                    background: "#e8f5e8",
                    borderRadius: "4px",
                  }}
                >
                  {item}
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setDroppedItems([])}
            style={{ marginTop: "10px" }}
          >
            Clear Dropped Items
          </button>
        </div>
      </div>
    </div>
  );
};

const EventsExample: React.FC = () => {
  return (
    <article className="section">
      <header>
        <h2>Advanced Events & Custom Events</h2>
        <p>
          <strong>Concept:</strong> Custom events, keyboard shortcuts, drag &
          drop, event communication
        </p>
      </header>

      <section>
        <h4>Custom Events (Component Communication):</h4>
        <p>
          Components can communicate through custom events without prop
          drilling:
        </p>
        <EventDispatcher />
        <EventListener />
      </section>

      <section style={{ marginTop: "20px" }}>
        <h4>Keyboard Event Handling:</h4>
        <KeyboardShortcuts />
      </section>

      <section style={{ marginTop: "20px" }}>
        <h4>Drag & Drop Events:</h4>
        <DragDropExample />
      </section>

      <aside style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
        <strong>Key concepts:</strong>
        <ul>
          <li>
            <strong>Custom Events:</strong> Create and dispatch custom events
            for component communication
          </li>
          <li>
            <strong>Event Listeners:</strong> Listen for events across the
            application
          </li>
          <li>
            <strong>Keyboard Events:</strong> Handle complex keyboard shortcuts
            and combinations
          </li>
          <li>
            <strong>Drag & Drop:</strong> Handle dragstart, dragover, drop
            events
          </li>
          <li>
            <strong>Event Prevention:</strong> preventDefault() and
            stopPropagation()
          </li>
          <li>
            <strong>Event Cleanup:</strong> Remove event listeners in useEffect
            cleanup
          </li>
        </ul>
      </aside>
    </article>
  );
};

export default EventsExample;
