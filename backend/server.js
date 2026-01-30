const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

// API endpoint
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  // check if any field is empty
  if (!name || !email || !message) {
    return res.json({
      success: false,
      message: "All fields are required"
    });
  }

  // log received data
  console.log("Received data:", req.body);

  // send response
  res.json({
    success: true,
    message: "Form submitted successfully"
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
