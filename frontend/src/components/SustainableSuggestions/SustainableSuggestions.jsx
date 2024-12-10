import { useState } from "react"
import axios from "axios"
import "./SustainableSuggestions.css"

const SustainableSuggestions = () => {
  const [inputs, setInputs] = useState({
    location: "",
    budget: "",
    constructionType: "",
  })
  const [suggestions, setSuggestions] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const getSuggestions = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:5000/sustainable-suggestions",
        inputs
      )
      setSuggestions(response.data.suggestions)
    } catch (error) {
      console.error("Error fetching suggestions:", error)
    }
    setLoading(false)
  }

  return (
    <div className="sustainable-container">
      <h2>Sustainable Building Suggestions</h2>
      <div className="input-form">
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={inputs.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Budget (USD):
          <input
            type="number"
            name="budget"
            value={inputs.budget}
            onChange={handleChange}
          />
        </label>
        <label>
          Construction Type:
          <select
            name="constructionType"
            value={inputs.constructionType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </label>
        <button onClick={getSuggestions} disabled={loading}>
          {loading ? "Fetching Suggestions..." : "Get Suggestions"}
        </button>
      </div>
      {suggestions && (
        <div className="suggestions-result">
          <h3>Recommendations:</h3>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SustainableSuggestions
