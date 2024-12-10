import { useState } from "react"
import Chatbot from "./components/Chatbot/Chatbot"
import DesignGenerator from "./components/DesignGenerator/DesignGenerator"
import PlotScanner from "./components/PlotScanner/PlotScanner"
import SustainableSuggestions from "./components/SustainableSuggestions/SustainableSuggestions"
import "./App.css"

function App() {
  const [activeSection, setActiveSection] = useState("design-generator")
  const [showChatbot, setShowChatbot] = useState(false)

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev)
  }

  return (
    <div className="App">
      {/* Sticky Navbar */}
      <header className="sticky-navbar">
        <h1><span style={{fontWeight: 900}}>
          HYRA
          </span>
          <span style={{fontWeight: 100}}>
            CONSTRUCT
            </span>
            </h1>

        <div className="navbar">
          <a
            href="#design-generator"
            className={activeSection === "design-generator" ? "active" : ""}
            onClick={() => setActiveSection("design-generator")}
          >
            Design Generator
          </a>
          <a
            href="#plot-scanner"
            className={activeSection === "plot-scanner" ? "active" : ""}
            onClick={() => setActiveSection("plot-scanner")}
          >
            Plot Scanner
          </a>
          <a
            href="#sustainable-suggestions"
            className={
              activeSection === "sustainable-suggestions" ? "active" : ""
            }
            onClick={() => setActiveSection("sustainable-suggestions")}
          >
            Sustainable Suggestions
          </a>
        </div>
      </header>

      <main>
        {activeSection === "design-generator" && (
          <section className="component-section">
            <div className="first-section">
              <h3>Design Generator</h3>
              <p>
                The Design Generator helps users input construction requirements
                such as number of rooms, style preferences, and size to receive
                AI-generated design suggestions. It streamlines the design
                process and enhances creativity.
              </p>
            </div>
            <div className="second-section">
              <DesignGenerator />
            </div>
          </section>
        )}

        {activeSection === "plot-scanner" && (
          <section className="component-section">
            <div className="first-section">
              <h3>Plot Scanner</h3>
              <p>
                The Plot Scanner allows users to analyze their land plots by
                scanning for dimensions, features, and topography. This ensures
                optimal space utilization for construction projects.
              </p>
            </div>
            <div className="second-section">
              <PlotScanner />
            </div>
          </section>
        )}

        {activeSection === "sustainable-suggestions" && (
          <section className="component-section">
            <div className="first-section">
              <h3>Sustainable Suggestions</h3>
              <p>
                Receive AI-driven recommendations for sustainable construction
                practices and materials. This feature promotes eco-friendly and
                cost-efficient building practices.
              </p>
            </div>
            <div className="second-section">
              <SustainableSuggestions />
            </div>
          </section>
        )}
      </main>

      {/* Chatbot Toggle */}
      <button className="chatbot-toggle-btn" onClick={toggleChatbot}>
        {showChatbot ? "Close Chatbot" : "Chat with HYRA"}
      </button>
      {showChatbot && <Chatbot />}

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 HYRA CONSTRUCT. Revolutionizing Construction with AI.</p>
      </footer>
    </div>
  )
}

export default App
