const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config()

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

const app = express()
app.use(cors())
app.use(bodyParser.json())

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

// Chat endpoint for existing chat functionality
app.post("/chat", async (req, res) => {
  const { message } = req.body

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    })
    res.json({ reply: response.data.choices[0].message.content })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Design Generation endpoint
app.post("/generate-design", async (req, res) => {
  const { numRooms, size, style } = req.body

  if (!numRooms || !size || !style) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  try {
    // AI request to generate a design description based on the provided input
    const prompt = `Generate a design for a house with ${numRooms} rooms, a size of ${size} square meters, and a ${style} style.`
    const response = await openai.createCompletion({
      model: "text-davinci-003", // You can use another model for this
      prompt: prompt,
      max_tokens: 150, // Adjust as needed
    })

    // Returning the AI-generated design suggestion (could include an image URL or description)
    const design = {
      description: response.data.choices[0].text.trim(),
      // Example image URL (can be dynamically generated or pre-defined)
      imageUrl: "https://example.com/generated-design.png",
    }

    res.json({ design })
  } catch (error) {
    console.error("Error generating design:", error)
    res.status(500).json({ error: error.message })
  }
})

app.post("/analyze-plot", upload.single("file"), async (req, res) => {
  const { dimensions } = req.body
  const parsedDimensions = dimensions ? JSON.parse(dimensions) : null

  try {
    // Handle uploaded file (if provided)
    if (req.file) {
      console.log("File uploaded:", req.file.path)
      // Process the file (e.g., image recognition, etc.)
    }

    // Use dimensions for analysis
    if (parsedDimensions) {
      console.log("Dimensions:", parsedDimensions)
      // Example AI logic (replace with your actual model)
      const area = parsedDimensions.length * parsedDimensions.width
      const analysis = `The plot has an area of ${area} square meters. It is suitable for medium-scale construction.`
      return res.json({ analysis })
    }

    // Default response if no input provided
    res.status(400).json({ error: "No valid input provided for analysis." })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/sustainable-suggestions", async (req, res) => {
  const { location, budget, constructionType } = req.body

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in sustainable architecture and green building practices.",
        },
        {
          role: "user",
          content: `Provide suggestions for a ${constructionType} project in ${location} with a budget of ${budget} USD. Recommendations should include sustainable materials, energy-efficient designs, and renewable energy options.`,
        },
      ],
    })

    const suggestions = response.data.choices[0].message.content.split("\n")
    res.json({ suggestions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000")
})
