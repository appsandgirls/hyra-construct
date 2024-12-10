/* eslint-disable no-unreachable */
import { useState } from "react"
import axios from "axios"
import "./DesignGenerator.css" // Create a CSS file to style the component

const DesignGenerator = () => {
  const [numRooms, setNumRooms] = useState("")
  const [size, setSize] = useState("")
  const [style, setStyle] = useState("")
  const [design, setDesign] = useState(null) // Store AI-generated design
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("") // Clear previous errors

    try {
      // Sending the input data to the backend AI API
      const response = await axios.post(
        "http://localhost:5000/generate-design",
        {
          numRooms,
          size,
          style,
        }
      )

      // Setting the received design in the state
      setDesign(response.data.design)
      setLoading(false)
    } catch (err) {
      console.error("Error generating design:", err)
      setError("Failed to generate design. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="design-generator-container">
      <h2>Design Generator</h2>
      <form onSubmit={handleSubmit} className="design-form">
        <div className="form-group">
          <label>Number of Rooms:</label>
          <input
            type="number"
            value={numRooms}
            onChange={(e) => setNumRooms(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Size (in square meters):</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Style:</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
          >
            <option value="">Select a style</option>
            <option value="modern">Modern</option>
            <option value="traditional">Traditional</option>
            <option value="minimalist">Minimalist</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Design"}
        </button>
      </form>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* AI-generated design */}
      {design && (
        <div className="design-result">
          <h3>Design Suggestions:</h3>
          <img src={design.imageUrl} alt="Generated Design" />
          <p>{design.description}</p>
          <button onClick={() => downloadDesign(design.imageUrl)}>
            Download Design
          </button>
        </div>
      )}
    </div>
  )

  // Function to download the design image
  const downloadDesign = (imageUrl) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = "design.png" // Filename for the download
    link.click()
  }
}

export default DesignGenerator
