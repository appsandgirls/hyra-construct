import { useState } from "react"
import axios from "axios"
import "./PlotScanner.css"

const PlotScanner = () => {
  const [file, setFile] = useState(null)
  const [dimensions, setDimensions] = useState({ length: "", width: "" })
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDimensions((prev) => ({ ...prev, [name]: value }))
  }

  const submitAnalysis = async () => {
    if (!file && (!dimensions.length || !dimensions.width)) {
      alert("Please provide either a file or plot dimensions.")
      return
    }

    setLoading(true)

    const formData = new FormData()
    if (file) formData.append("file", file)
    formData.append("dimensions", JSON.stringify(dimensions))

    try {
      const response = await axios.post(
        "http://localhost:5000/analyze-plot",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      setAnalysisResult(response.data.analysis)
    } catch (error) {
      console.error("Error analyzing plot:", error)
    }

    setLoading(false)
  }

  return (
    <div className="plot-scanner-container">
      <h2>Plot Scanner and Analysis</h2>
      <div className="input-section">
        <label>
          Upload Plot Image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <div className="dimensions-input">
          <label>
            Length (m):
            <input
              type="number"
              name="length"
              value={dimensions.length}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Width (m):
            <input
              type="number"
              name="width"
              value={dimensions.width}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button onClick={submitAnalysis} disabled={loading}>
          {loading ? "Analyzing..." : "Submit for Analysis"}
        </button>
      </div>
      {analysisResult && (
        <div className="analysis-result">
          <h3>Analysis Result:</h3>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  )
}

export default PlotScanner
