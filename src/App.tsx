import React, { useState } from "react";
import BasicExample from "./examples/BasicExample.tsx";
import PropsExample from "./examples/PropsExample.tsx";
import StateExample from "./examples/StateExample.tsx";
import EventsExample from "./examples/EventsExample.tsx";
import ListsExample from "./examples/ListsExample.tsx";
import FormsExample from "./examples/FormsExample.tsx";
import CounterChallenge from "./challenges/CounterChallenge.tsx";
import TodoChallenge from "./challenges/TodoChallenge.tsx";
import HooksExample from "./advanced-examples/HooksExample.tsx";
import AdvancedEventsExample from "./advanced-examples/EventsExample.tsx";
import PerformanceExample from "./advanced-examples/PerformanceExample.tsx";
import ChatAppChallenge from "./advanced-challenges/ChatAppChallenge.tsx";
import DataVisualizationChallenge from "./advanced-challenges/DataVisualizationChallenge.tsx";
import GameEngineChallenge from "./advanced-challenges/GameEngineChallenge.tsx";

// Define the available sections
type Section = "examples" | "challenges" | "advanced";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("examples");

  return (
    <div className="container">
      <header>
        <h1>React + TypeScript Learning Journey</h1>
      </header>

      <nav style={{ margin: "20px 0" }}>
        <button
          onClick={() => setActiveSection("examples")}
          style={{
            background: activeSection === "examples" ? "#2980b9" : "#3498db",
          }}
        >
          Examples
        </button>
        <button
          onClick={() => setActiveSection("challenges")}
          style={{
            background: activeSection === "challenges" ? "#2980b9" : "#3498db",
          }}
        >
          Challenges
        </button>
        <button
          onClick={() => setActiveSection("advanced")}
          style={{
            background: activeSection === "advanced" ? "#2980b9" : "#3498db",
          }}
        >
          Advanced
        </button>
      </nav>

      <main>
        {activeSection === "examples" && (
          <section aria-label="Learning Examples">
            <BasicExample />
            <PropsExample />
            <StateExample />
            <EventsExample />
            <ListsExample />
            <FormsExample />
          </section>
        )}

        {activeSection === "challenges" && (
          <section aria-label="Practice Challenges">
            <CounterChallenge />
            <TodoChallenge />
            <ChatAppChallenge />
            <DataVisualizationChallenge />
            <GameEngineChallenge />
          </section>
        )}

        {activeSection === "advanced" && (
          <section aria-label="Advanced Concepts">
            <HooksExample />
            <AdvancedEventsExample />
            <PerformanceExample />
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
